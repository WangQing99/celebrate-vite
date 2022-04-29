export interface BasicPageParams {
    page: number;
    size: number;
}

export interface BasicFetchResult<T> {
    data: T[];
    total: number;
}
