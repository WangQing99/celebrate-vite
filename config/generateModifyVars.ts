import { getThemeVariables } from "ant-design-vue/dist/theme"
import { resolve } from 'path';

/**
 * less 全局声明
 */
export function generateModifyVars(dark = false) {

    const modifyVars = getThemeVariables({ dark });

    return {
        hack: `${modifyVars.hack} @import (reference) "${resolve('src/design/config.less')}";`,
    }
}
