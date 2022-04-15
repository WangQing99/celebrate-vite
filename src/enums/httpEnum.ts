/**
 * 请求结果枚举
 */
export enum ResultEnum {
    SUCCESS = 200,
    error = -1,
    TYPE = 'success'
}

/**
 * contentType枚举
 */
export enum ContentTypeEnum {
    // json
    JSON = 'application/json;charset=UTF-8',
    // form-data qs
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data  upload
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
