export interface Pager<T> {
    elements: T[];
    pagination: {
        totalRecords: number;
        count: number;
        totalPages: number;
        nextPage: number;
        previousPage: number;
        lastPage: number;
        pageSize: number;
        currentPage: number;
    }
}



export type PaginationLink = {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
};

export type PaginationMeta = {
    current_page: number;
    from: number | null;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
};

export type ApiPaginationLinks = {
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
};

export interface LaravelPager<T> {
    data: T[];
    links: ApiPaginationLinks;
    meta: PaginationMeta;
}
export interface LookupPager<T> {
    filter?: string;
    elements: T[];
    pagination: {
        totalRecords: number;
        count: number;
        totalPages: number;
        nextPage: number;
        previousPage: number;
        lastPage: number;
        pageSize: number;
        currentPage: number;
    }
}