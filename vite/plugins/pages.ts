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
        Layouts({
            defaultLayout: "default",
        }),
        Pages({
            // 自动读取src/views下的vue文件，生成路由信息，默认路由路径'/‘
            dirs: [{ dir: "src/pages", baseRoute: "/" }],
            // 异步方式加载路由组件
            importMode: "async",
            // 遍历路由信息，给默认路由加一个redirect
            extendRoute(route) {
                if (route.path === "/") return { ...route, redirect: "/demo/menu2" }
            },
            exclude: [
                '**/components/**/*.vue'
            ]
        })
    ]
}
