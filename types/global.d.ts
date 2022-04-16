import type {
    PropType as VuePropType,
} from 'vue';

declare global {

    declare type Nullable<T> = T | null;
    declare type NonNullable<T> = T extends null | undefined ? never : T;
    declare type Recordable<T = any> = Record<string, T>;

    interface ImportMetaEnv extends ViteEnv {
        __: unknown;
    }

    declare interface ViteEnv {
        VITE_PORT: number;
        VITE_USE_MOCK: boolean;
        VITE_PUBLIC_PATH: string;
        VITE_PROXY: [string, string][];
        VITE_DROP_CONSOLE: boolean;
        // plugin
        VITE_USE_MOCK: boolean;
        VITE_USE_IMAGEMIN: boolean;
        VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    }
}

declare module 'vue' {
    export type JSXComponent<Props = any> =
        | { new(): ComponentPublicInstance<Props> }
        | FunctionalComponent<Props>;
}
