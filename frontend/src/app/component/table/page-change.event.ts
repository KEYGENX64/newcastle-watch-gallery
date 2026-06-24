export interface PageChangeEvent {
    filters?: Record<string, string>;
    orderBy?: string[];
    length: number;
    pageSize: number;
    pageIndex: number;
    pageSizeOptions: number[];
    showFirstLastButtons: boolean;
}