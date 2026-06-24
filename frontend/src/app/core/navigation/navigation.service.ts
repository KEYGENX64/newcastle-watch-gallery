import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { TranslocoService } from '@ngneat/transloco';
import { Navigation } from 'app/core/navigation/navigation.types';
import { Observable, ReplaySubject, Subscription, switchMap, takeUntil, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {
    private _httpClient = inject(HttpClient);
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);

    private _subscription: Subscription | null = null;

    private _translocoService: TranslocoService = inject(TranslocoService);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation) => {
                if (this._subscription)
                    this._subscription.unsubscribe();

                this._subscription = this._translocoService.langChanges$
                    .pipe(
                        switchMap(lang => {
                            return this._translocoService.load(lang);
                        }))
                    .subscribe(() => {
                        this._navigation.next(this.translateNavigation(navigation));
                    });
            })
        );
    }

    ngOnDestroy(): void {
        if (this._subscription)
            this._subscription.unsubscribe();
    }

    private translateNavigation(data: Navigation): Navigation {
        return {
            compact: this.translateMenu(data.compact),
            default: this.translateMenu(data.default),
            futuristic: this.translateMenu(data.futuristic),
            horizontal: this.translateMenu(data.horizontal),
        }
    }
    private translateMenu(data: FuseNavigationItem[]): FuseNavigationItem[] {
        if (!data || data.length === 0) {
            return [];
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
                if (item.tooltip) {
                    item.tooltip = this._translocoService.translate(item.tooltip);
                }
                if (item.children && item.children.length > 0) {
                    translateRecursive(item.children);
                }
            });
        };

        translateRecursive(clonedData);

        return clonedData;

    }
    
}
