import type { ConfigEnv, UserConfig } from "vite"
import { loadEnv } from 'vite'
import createVitePlugins from "./vite/plugins"
import { alias, createProxy } from './vite/config'
import { wrapperEnv } from "./vite/utils";

export default ({ command, mode }: ConfigEnv): UserConfig => {
    const root = process.cwd();
    const env = loadEnv(mode, root);
    const isBuild = command === 'build';

    const viteEnv = wrapperEnv(env);

    const { VITE_PORT, VITE_PROXY, VITE_DROP_CONSOLE, VITE_PUBLIC_PATH } = viteEnv
    return {
        base: VITE_PUBLIC_PATH,
        root,
        resolve: {
            alias
        },
        server: {
            https: true,
            host: true,
            port: VITE_PORT,
            proxy: createProxy(VITE_PROXY),
        },
        esbuild: {
            pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
        },
        plugins: createVitePlugins(viteEnv, isBuild),
        optimizeDeps: {
            include: [
                '@vue/runtime-core',
                '@vue/shared',
                '@iconify/iconify',
                'ant-design-vue/es/locale/zh_CN',
                'ant-design-vue/es/locale/en_US',
            ],
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id: string) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString()
                        }
                    },
                }
            },
        },
    }
}
