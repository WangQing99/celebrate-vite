/**
 * @description: 请求结果枚举
 */
export enum ResultEnum {
    SUCCESS = 200,
    error = -1,
    TIMEOUT = 401,
    TYPE = 'success'
}

/**
 * @description: 请求方法
 */
export enum RequestEnum {
    GET = 'GET',
    POST = 'POST',
}

/**
 * @description: contentType枚举
 */
export enum ContentTypeEnum {
    // json
    JSON = 'application/json;charset=UTF-8',
    // form-data qs
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data  upload
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
