

export interface GlobConfig {
    // 标题
    title: string;
    // 服务接口url
    apiUrl: string;
    // 上传url
    uploadUrl?: string;
    // 服务接口前缀
    urlPrefix?: string;
    // 上传地址
    shortName: string;
}

export interface GlobEnvConfig {
    // 标题
    VITE_GLOB_APP_TITLE: string;
    // api地址
    VITE_GLOB_API_URL: string;
    // api前缀
    VITE_GLOB_API_URL_PREFIX?: string;
    // 项目简写
    VITE_GLOB_APP_SHORT_NAME: string;
    // 上传地址
    VITE_GLOB_UPLOAD_URL?: string;
}
