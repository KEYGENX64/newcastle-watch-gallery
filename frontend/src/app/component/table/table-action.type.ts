import { Observable } from "rxjs";

export interface TableAction {
    name: string;
    icon: string;
    cssIconClass?: string;
    show?: (item: any) => boolean;
    on: (item: any) => Observable<any>;
}

export interface TableHeadAction {
    name: string;
    icon: string;
    cssIconClass?: string;
    show?: () => boolean;
    on: () => Observable<any>;
}