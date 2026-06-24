import { Component, input } from "@angular/core";
import { BaseComponent } from "../base-component";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { DisplayedColumn, Table } from "./table.type";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { DialogConfirmComponent } from "../dialog/confirm/confirm.component";
import { TranslocoModule } from "@ngneat/transloco";
import { PipeLineModule } from "app/core/pipe-line/pipe-line.module";
import { TableAction, TableHeadAction } from "./table-action.type";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatPaginatorModule,
        MatButtonModule, MatTooltipModule, MatIconModule,
        TranslocoModule, PipeLineModule, NgOptimizedImage]
})
export class TableComponent extends BaseComponent {

    config = input.required<Table>();
    get _config(): Table {
        return this.config();
    }

    get displayedColumns(): string[] {
        return ["row", ...this._config.displayedColumns.map(x => typeof x === 'string' ? x : x.name), "action"]
    }

    dataSource = new MatTableDataSource<any>([]);

    _pageChangeEvent = {
        length: 0,
        pageSize: 15,
        pageIndex: 0,
        pageSizeOptions: [15, 20, 50, 100, 1000],
        showFirstLastButtons: true,
        sort: undefined,
        filter: []
    }

    onHandlePageEvent(event: any) {
        this._pageChangeEvent.length = event.length;
        this._pageChangeEvent.pageSize = event.pageSize;
        this._pageChangeEvent.pageIndex = event.pageIndex;
        this.onLoad();
    }

    ngOnInit() {
        this.onLoad();
    }

    showAction(action: TableAction, element: any) {
        if (action.show)
            return action.show(element);


        return true;
    }
    showHeadAction(action: TableHeadAction) {
        if (action.show)
            return action.show();


        return true;
    }


    onLoad() {
        this._config.update(this._pageChangeEvent).subscribe(pager => {
            this._pageChangeEvent.length = pager.pagination.totalRecords;
            this.dataSource = new MatTableDataSource(pager.elements.map((item, index) => {
                return {
                    row: (this._pageChangeEvent.pageIndex * this._pageChangeEvent.pageSize) + (index + 1),
                    ...item
                }
            }));
        })
    }

    convertDisplayedColumn(item: (DisplayedColumn | string)) {
        if (typeof item === 'string') return item;

        return item.name;
    }

    isString(value: (DisplayedColumn | string)) {
        return typeof value === 'string';
    }
    elementColor(value: (DisplayedColumn | string)) {
        let result = {};

        if (typeof value === 'string') return result;

        var item: DisplayedColumn = value as DisplayedColumn;
        if (item.cssClass)
            result[item.cssClass] = true;

        return result;
    }

    onHeadAction(name: string, event: any) {
        event.stopPropagation();

        let action = this._config.headActions.find(x => x.name == name);
        if (action) {
            var confirmRef = this._dialog.open(DialogConfirmComponent, {
                data: { title: 'Dialog.Processing.Title', message: 'Dialog.Processing.Message' }
            })
            confirmRef.afterClosed().subscribe((confirm: boolean) => {
                if (confirm == true) {
                    action.on().subscribe(x => {
                        if (x == true)
                            this.onLoad();
                    })
                }
            });

        }
    }
    onAction(name: string, item: any, event: any) {
        event.stopPropagation();

        let action = this._config.actions.find(x => x.name == name);
        if (action) {
            var confirmRef = this._dialog.open(DialogConfirmComponent, {
                data: { title: 'Dialog.Processing.Title', message: 'Dialog.Processing.Message' }
            })
            confirmRef.afterClosed().subscribe((confirm: boolean) => {
                if (confirm == true) {
                    action.on(item).subscribe(x => {
                        if (x == true)
                            this.onLoad();
                    })
                }
            });

        }
    }
}