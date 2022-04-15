/**
 * https://github.com/hannoeru/vite-plugin-pages
 */
import Pages from "vite-plugin-pages"
/**
 * https://github.com/JohnCampionJr/vite-plugin-vue-layouts
 */
import Layouts from 'vite-plugin-vue-layouts'

export function configPagesPlugin() {
    return [
        Layouts(),

        Pages()
    ]
}
