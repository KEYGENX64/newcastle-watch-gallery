export interface Paging {
    filters?: Record<string, string>;
    orderBy?: string[];
    currentPage: number;
    pageSize: number;
}

export interface LookupPaging {
    filter?: string;
    currentPage: number;
    pageSize: number;
}