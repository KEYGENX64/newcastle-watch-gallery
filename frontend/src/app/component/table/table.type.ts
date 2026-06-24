import { Observable } from "rxjs";
import { PageChangeEvent } from "./page-change.event";
import { Pager } from "app/core/api/models/pager.type";
import { TableAction, TableHeadAction } from "./table-action.type";

export interface DisplayedColumn {
    name: string;
    type: 'price' | 'date' | 'date-time' | 'time' | 'enum' | 'sex' | 'bool' | 'bool-reverse' | 'image' | 'selected';
    cssClass?: string;
}

export interface Table {
    displayedColumns: (DisplayedColumn | string)[];
    update: (event: PageChangeEvent) => Observable<Pager<any>>;
    actions: TableAction[];
    headActions?: TableHeadAction[];
}