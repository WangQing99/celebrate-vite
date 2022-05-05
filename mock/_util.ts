export function resultSuccess<T = Recordable>(data: T, { message = 'ok' } = {}) {
    return {
        code: 200,
        data,
        message,
        type: 'success',
    };
}

export function resultPageSuccess<T = any>(
    page: number,
    pageSize: number,
    data: T[],
    { message = 'ok' } = {},
) {
    const pageData = pagination(page, pageSize, data);

    return {
        ...resultSuccess({
            items: pageData,
            total: data.length,
        }),
        message,
    };
}

export function resultError(message = 'Request failed', { code = -1, data = null } = {}) {
    return {
        code,
        data,
        message,
        type: 'error',
    };
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
    const offset = (pageNo - 1) * Number(pageSize);
    const ret =
        offset + Number(pageSize) >= array.length
            ? array.slice(offset, array.length)
            : array.slice(offset, offset + Number(pageSize));
    return ret;
}

export interface requestParams {
    method: string;
    body: any;
    headers?: { authorization?: string };
    query: any;
}

export function getRequestToken({ headers }: requestParams): string | undefined {
    return headers?.authorization;
}
