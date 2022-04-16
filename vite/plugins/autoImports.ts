/**
 * https://github.com/antfu/unplugin-vue-components
 */
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"
/**
 * // https://github.com/antfu/unplugin-auto-import
 */
import AutoImport from 'unplugin-auto-import/vite'
/**
 * https://github.com/antfu/unplugin-icons
 */
import IconsResolver from 'unplugin-icons/resolver'

export function configAutoImports() {
    return [
        Components({
            resolvers: [
                IconsResolver(),
                AntDesignVueResolver()
            ],
            dts: 'types/components.d.ts'
        }),
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                'vue/macros',
                "@vueuse/core"
            ],
            dts: 'types/auto-imports.d.ts'
        })
    ]
}
