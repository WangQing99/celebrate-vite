import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import type { RequestOptions, Result } from "#/axios"
import type { CreateAxiosOptions } from "./axiosTransform"

import axios from "axios";
import { cloneDeep } from 'lodash-es';

import { isFunction } from "@/utils/is"

/**
 * @description: axios 模块
 */
export class Axios {
    private axiosInstance: AxiosInstance;
    private readonly options: CreateAxiosOptions;

    constructor(options: CreateAxiosOptions) {
        this.options = options;
        this.axiosInstance = axios.create(options);
        this.setupInterceptors();
    }

    private getTransform() {
        const { transform } = this.options;
        return transform;
    }

    private setupInterceptors() {
        const transform = this.getTransform();
        if (!transform) {
            return;
        }
        const {
            requestInterceptors,
            responseInterceptors,
        } = transform;


        this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
            if (requestInterceptors && isFunction(requestInterceptors)) {
                config = requestInterceptors(config, this.options);
            }
            return config;
        })

        this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
            if (responseInterceptors && isFunction(responseInterceptors)) {
                res = responseInterceptors(res);
            }
            return res;
        }, undefined);
    }

    get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request({ ...config, method: 'GET' }, options);
    }

    post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request({ ...config, method: 'POST' }, options);
    }

    request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        let conf: CreateAxiosOptions = cloneDeep(config);
        const transform = this.getTransform();

        const { requestOptions } = this.options;

        // 将请求的时候的参数和配置参数合并
        const opt: RequestOptions = Object.assign({}, requestOptions, options);

        const { beforeRequestHook, transformRequestHook, requestCatchHook } = transform || {};
        if (beforeRequestHook && isFunction(beforeRequestHook)) {
            conf = beforeRequestHook(conf, opt);
        }
        conf.requestOptions = opt;

        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request<any, AxiosResponse<Result>>(conf)
                .then((res: AxiosResponse<Result>) => {
                    // 处理请求数据。如果数据不是预期格式，可直接抛出错误
                    if (transformRequestHook && isFunction(transformRequestHook)) {
                        try {
                            const ret = transformRequestHook(res, opt);
                            resolve(ret);
                        } catch (err) {
                            reject(err || new Error('request error!'));
                        }
                        return;
                    }
                    resolve(res as unknown as Promise<T>);
                }).catch((e: Error | AxiosError) => {
                    if (requestCatchHook && isFunction(requestCatchHook)) {
                        reject(requestCatchHook(e, opt));
                        return;
                    }
                    if (axios.isAxiosError(e)) {
                        // rewrite error message from axios in here
                    }
                    reject(e);
                })
        })
    }
}
