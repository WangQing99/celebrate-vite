import type { GlobConfig } from '#/config';

import { warn } from '@/utils/log';
import { getAppEnvConfig } from '@/utils/env';

export function useGlobSetting(): Readonly<GlobConfig> {
    const {
        VITE_GLOB_APP_TITLE,
        VITE_GLOB_API_URL,
        VITE_GLOB_APP_SHORT_NAME,
        VITE_GLOB_API_URL_PREFIX,
        VITE_GLOB_UPLOAD_URL,
    } = getAppEnvConfig();

    if (!/[a-zA-Z\_]*/.test(VITE_GLOB_APP_SHORT_NAME)) {
        warn(
            `VITE_GLOB_APP_SHORT_NAME 变量只能是字符/下划线，请在环境变量中修改并重新运行。`,
        );
    }

    // 取全局配置项
    const glob: Readonly<GlobConfig> = {
        title: VITE_GLOB_APP_TITLE,
        apiUrl: VITE_GLOB_API_URL,
        shortName: VITE_GLOB_APP_SHORT_NAME,
        urlPrefix: VITE_GLOB_API_URL_PREFIX,
        uploadUrl: VITE_GLOB_UPLOAD_URL,
    };
    return glob as Readonly<GlobConfig>;
}
