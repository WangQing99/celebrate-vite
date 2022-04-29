import type { GlobEnvConfig } from '#/config';

import { warn } from '@/utils/log';
import { getConfigFileName } from '../../build/getConfigFileName';

/**
 * 获取应用的环境配置
 */
export function getAppEnvConfig() {
    const ENV_NAME = getConfigFileName(import.meta.env);

    const ENV = (import.meta.env.DEV
        ? (import.meta.env as unknown as GlobEnvConfig)
        : window[ENV_NAME as any]) as unknown as GlobEnvConfig;

    const {
        VITE_GLOB_APP_TITLE,
        VITE_GLOB_API_URL,
        VITE_GLOB_APP_SHORT_NAME,
        VITE_GLOB_API_URL_PREFIX,
        VITE_GLOB_UPLOAD_URL,
    } = ENV;

    if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
        warn(
            `VITE_GLOB_APP_SHORT_NAME 变量只能是字符/下划线，请在环境变量中修改并重新运行。`,
        );
    }

    return {
        VITE_GLOB_APP_TITLE,
        VITE_GLOB_API_URL,
        VITE_GLOB_APP_SHORT_NAME,
        VITE_GLOB_API_URL_PREFIX,
        VITE_GLOB_UPLOAD_URL,
    };
}

/**
 * 获取环境
 */
export function getEnv(): string {
    return import.meta.env.MODE;
}
