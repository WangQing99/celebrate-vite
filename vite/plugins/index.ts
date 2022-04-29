import { PluginOption } from "vite";
import Vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx';

import Icons from 'unplugin-icons/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import VitePluginCertificate from 'vite-plugin-mkcert';
import Unocss from 'unocss/vite'
import Inspect from 'vite-plugin-inspect'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'

import { configPagesPlugin } from "./pages"
import { configAutoImports } from "./autoImports"
import { configMockPlugin } from "./mock"
import { configStyleImportPlugin } from "./styleImport";
import { configSvgIconsPlugin } from "./svgIcons";
import { configImageminPlugin } from "./imagemin";
import { configCompressPlugin } from "./compress";
import { configThemePlugin } from "./theme";

export default function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
    const {
        VITE_USE_IMAGEMIN,
        VITE_USE_MOCK,
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    } = viteEnv;

    const vitePlugins: (PluginOption | PluginOption[])[] = [
        Vue({
            reactivityTransform: true,
        }),
        vueJsx(),
        vueSetupExtend(),
        Icons({
            compiler: "vue3",
            autoInstall: true,
        }),
        PkgConfig(),
        OptimizationPersist(),
        Unocss(),
        VitePluginCertificate({
            source: 'coding',
        }),
        // http://localhost:xxxx/__inspect/
        Inspect(),
    ]

    // 生成页面和layout
    // vitePlugins.push(configPagesPlugin())

    // 自动导入组件和api
    vitePlugins.push(configAutoImports())

    // mock服务
    VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

    // 组件样式自动导入
    vitePlugins.push(configStyleImportPlugin(isBuild))

    // svg
    vitePlugins.push(configSvgIconsPlugin(isBuild))

    // theme
    // vitePlugins.push(configThemePlugin(isBuild));

    if (isBuild) {
        // 图片优化处理
        VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin())

        // 压缩包
        vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE))
    }

    return vitePlugins
}
