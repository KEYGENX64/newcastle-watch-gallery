import { CommonModule } from "@angular/common";
import { Component, input, ViewChild } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelect, MatSelectModule } from "@angular/material/select";
import { LookupResponse, WidgetConfig } from "../../form-schema.model";
import { TranslocoModule } from "@ngneat/transloco";
import { BidiModule } from "@angular/cdk/bidi";
import { AppSettingService } from "app/core/app-setting/app-setting.service";
import { availableLangs } from "environments/available-langs";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: 'widget-input-select',
    templateUrl: './input-select.widget.html',
    standalone: true,
    imports: [MatFormFieldModule, MatIconModule,
        MatSelectModule, CommonModule, ReactiveFormsModule, TranslocoModule, BidiModule
    ]
})

export class InputSelectWidget {
    @ViewChild("select") select: MatSelect;
    @ViewChild("search") search: any;
    currentDirection: 'ltr' | 'rtl' = 'ltr';
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    formControl = input.required<FormControl>();
    widgetConfig = input.required<WidgetConfig>();

    _items: LookupResponse[] = [];
    _cashItems: LookupResponse[] = [];

    get _formControl(): FormControl {
        return this.formControl();
    }
    get _widgetConfig(): WidgetConfig {
        return this.widgetConfig();
    }

    _count = 0;
    _pageSize = 20;
    _currentPageIndex = 0;
    _search: string | undefined = undefined;

    constructor(private _appSetting: AppSettingService) { }

    ngOnInit() {
        this._appSetting.appSetting$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(setting => { var lang = availableLangs.find(x => x.id == setting.lang); this.currentDirection = lang!.dir; });
        this.onLoad();
    }

    onChangeText(value: string | null | undefined) {
        if (value === null || value === '' || value === undefined)
            this._search = undefined;
        else this._search = value

        if (this._widgetConfig.options) {
            if (value === null || value === '' || value === undefined) this._cashItems = this._items;
            else this._cashItems = this._items.filter(x => x.name.includes(value));
        } else if (this._widgetConfig.init) {
            this._widgetConfig.init(this._search).subscribe(items => {
                this._cashItems = this._items;
            })
        }
        else if (this._widgetConfig.update) {
            this._currentPageIndex = 0;

            this._widgetConfig.update(this._currentPageIndex, this._pageSize, this._search).subscribe(pager => {
                this._items = pager.elements;
                this._count = pager.pagination.totalRecords;
                this._cashItems = this._items;

                this._currentPageIndex++;
            })
        }
    }

    openedChange(event: any) {
        if (event == true) {
            var element = this.select.panel.nativeElement as HTMLElement;
            element.addEventListener('scroll', this.onScroll.bind(this))
        }

        if (this._cashItems.length == 0) {
            this.search.nativeElement.value = null;
            this.onChangeText(null)
        }
    }

    onScroll(event: Event) {
        var element = event.target as HTMLDivElement;
        let per = (element.scrollTop * 100) / (element.scrollHeight - element.clientHeight);

        if (this._widgetConfig.update) {
            let totalPage = Math.ceil(this._count / this._pageSize);
            if (per >= 95 && this._currentPageIndex < totalPage) {
                this._currentPageIndex++
                this._widgetConfig.update(this._currentPageIndex, this._pageSize, this._search).subscribe(pager => {
                    this._items.push(...pager.elements);
                    this._count = pager.pagination.totalRecords;
                })
            }
        }
    }

    reset() {
        this._formControl.setValue(null);
    }

    onLoad(_currentPageIndex = 0) {
        if (this._widgetConfig.options) {
            this._items = this._widgetConfig.options as LookupResponse[];
            this._cashItems = this._items;

            this.setDefaultValue(this._items);
        }
        else if (this._widgetConfig.init) {
            this._widgetConfig.init(this._search).subscribe(items => {
                this._items = items;
                this._cashItems = items;

                this.setDefaultValue(this._items);
            })

        }
        else if (this._widgetConfig.update) {
            this._widgetConfig.update(_currentPageIndex, this._pageSize, this._search).subscribe(pager => {
                this._items = pager.elements;
                this._count = pager.pagination.totalRecords;
                this._cashItems = this._items;

                this.setDefaultValue(pager.elements);
            })
        }


    }


    setDefaultValue(items: LookupResponse[]) {
        console.log(this._formControl.value)
        let itemSelected = items.find(x => x.selected == true);
        if (itemSelected && !this._widgetConfig.defaultValue && !this._formControl.value)
            this._formControl.setValue(itemSelected.id);
    }
}
