import type { AxiosResponse } from 'axios';
import type { RequestOptions, Result } from "#/axios"
import type { AxiosTransform, CreateAxiosOptions } from "./axiosTransform"

import { clone } from "lodash-es"

import { Axios } from './Axios';
import { useGlobSetting } from '@/hooks/setting';
import { useMessage } from "@/hooks/web/useMessage"
import { ResultEnum, RequestEnum } from '@/enums/httpEnum';
import { isString } from '@/utils/is';
import { formatRequestDate, joinTimestamp } from "./helper"
import { setObjToUrlParams, deepMerge } from '@/utils'

const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix;
const { createMessage, createErrorModal } = useMessage();

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
    /**
     * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
     */
    transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
        const { isTransformResponse, isReturnNativeResponse } = options;
        // 是否返回原生响应头 比如：需要获取响应头时使用该属性
        if (isReturnNativeResponse) {
            return res;
        }

        // 如果不需要处理返回结果，直接返回 用于页面中可能需要直接获取code、data、message这些信息时开启
        if (!isTransformResponse) {
            return res.data;
        }

        // 错误直接返回
        const { data } = res;
        if (!data) {
            // 请求没有返回值
            throw new Error("请求出错，请稍候重试");
        }
        // 获取到后台返回的字段
        const { code, data: result, message } = data;

        // 如果请求成功返回结果
        const hasSuccess = data && Reflect.has(data, "code") && code === ResultEnum.SUCCESS;
        if (hasSuccess) {
            return result;
        }

        // 根据code不同执行不同的操作，如果不希望中断当前请求，请return数据，否则直接抛出异常即可
        let timeoutMsg = '';
        switch (code) {
            case ResultEnum.TIMEOUT:
                timeoutMsg = "登录超时,请重新登录!"
            default:
                if (message) {
                    timeoutMsg = message;
                }
        }

        // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
        // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
        if (options.errorMessageMode === 'modal') {
            createErrorModal({ title: '错误提示', content: timeoutMsg });
        } else if (options.errorMessageMode === 'message') {
            createMessage.error(timeoutMsg);
        }

        throw new Error(timeoutMsg || '请求出错，请稍候重试');
    },
    /**
     * @description 请求之前处理config
     */
    beforeRequestHook: (config, options) => {
        const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

        // 如果需要拼接前缀，则把url加上前缀
        if (joinPrefix) {
            config.url = `${urlPrefix}${config.url}`;
        }

        // 拼接apiurl
        if (apiUrl && isString(apiUrl)) {
            config.url = `${apiUrl}${config.url}`;
        }

        const params = config.params || {};
        const data = config.data || false;

        formatDate && data && !isString(data) && formatRequestDate(data)

        if (config.method?.toUpperCase() === RequestEnum.GET) {
            if (!isString(params)) {
                // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
                config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
            } else {
                // 兼容restful风格
                config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
                config.params = undefined;
            }
        } else {
            if (!isString(params)) {
                formatDate && formatRequestDate(params);
                if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
                    config.data = data;
                    config.params = params;
                } else {
                    // 非GET请求如果没有提供data，则将params视为data
                    config.data = params;
                    config.params = undefined;
                }
                // 如果需要拼接参数到url，则把参数拼接到url上
                if (joinParamsToUrl) {
                    config.url = setObjToUrlParams(
                        config.url as string,
                        Object.assign({}, config.params, config.data),
                    );
                }
            } else {
                // 兼容restful风格
                config.url = config.url + params;
                config.params = undefined;
            }
        }
        return config;
    },
    /**
     * @description: 请求拦截器处理
     */
    requestInterceptors: (config) => {
        return config;
    },
    /**
     * @description: 响应拦截器处理
     */
    responseInterceptors: (res: AxiosResponse<any>) => {
        return res;
    },
    /**
     * @description: 响应错误处理
     */
}

/**
 * @description: 创建axios实例
 */
function createAxios(opt?: Partial<CreateAxiosOptions>) {
    return new Axios(
        deepMerge(
            {
                // 数据处理方式
                transform: clone(transform),
                requestOptions: {
                    // 默认将prefix 添加到url
                    joinPrefix: true,
                    // 接口地址
                    apiUrl: globSetting.apiUrl,
                    // 接口拼接地址
                    urlPrefix: urlPrefix,
                    // 是否携带token
                    withToken: true,
                }
            },
            opt || null
        )
    )
}

export const defHttp = createAxios();
