import { MatDrawerContent, MatSidenavModule } from '@angular/material/sidenav';
import { Component, input, signal, ViewChild } from "@angular/core";
import { FuseNavigationItem, FuseVerticalNavigationComponent } from "@fuse/components/navigation";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { TranslocoService } from '@ngneat/transloco';
import { BaseComponent } from 'app/component/base-component';
import { CommonModule } from '@angular/common';
import { switchMap, takeUntil } from 'rxjs';
import { availableLangs } from 'environments/available-langs';
import { UserComponent } from 'app/layout/common/user/user.component';

@Component({
    selector: 'menu-drawer',
    templateUrl: './menu-drawer.component.html',
    standalone: true,
    imports: [FuseVerticalNavigationComponent, MatSidenavModule, MatIconModule, MatButtonModule, CommonModule, UserComponent]
})
export class MenuDrawerComponent extends BaseComponent {
    @ViewChild('matDrawerContent') matDrawerContent!: MatDrawerContent;
    currentDir = 'ltr';
    constructor(private _fuseMediaWatcherService: FuseMediaWatcherService, private readonly _translocoService: TranslocoService) {
        super()
    }

    menuData = input<FuseNavigationItem[]>([])
    translatedMenuData = signal<FuseNavigationItem[]>([]);

    isScreenSmall: boolean = false;

    ngOnInit(): void {
        const data = this.menuData();
        const activeLang = this._translocoService.getActiveLang();

        this._translocoService.load(activeLang).subscribe(() => {
            this.translateMenu(data);
        });

        this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                this.isScreenSmall = !matchingAliases.includes('md');
            });

        this._translocoService.langChanges$
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap(lang => {
                    let availableLang = availableLangs.find(x => x.id == lang);
                    if (availableLang) {
                        this.currentDir = availableLang.dir;
                    }

                    return this._translocoService.load(lang);
                }))
            .subscribe(() => {
                this.translateMenu(this.menuData());
            });
    }

    private translateMenu(data: FuseNavigationItem[]): void {
        if (!data || data.length === 0) {
            this.translatedMenuData.set([]);
            return;
        }

        const clonedData: FuseNavigationItem[] = JSON.parse(JSON.stringify(data));

        const translateRecursive = (items: FuseNavigationItem[]) => {
            items.forEach(item => {
                if (item.title) {
                    item.title = this._translocoService.translate(item.title);
                }
                if (item.subtitle) {
                    item.subtitle = this._translocoService.translate(item.subtitle);
                }
                if (item.children && item.children.length > 0) {
                    translateRecursive(item.children);
                }
            });
        };

        translateRecursive(clonedData);

        this.translatedMenuData.set(clonedData);
    }
}