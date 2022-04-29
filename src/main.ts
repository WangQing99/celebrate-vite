import '@unocss/reset/tailwind.css'
import "@/design/index.less"
import 'uno.css'

import { createApp } from "vue"
import App from "./App.vue"
import { router,setupRouter } from "@/router";
import { setupStore } from '@/store'
import { setupRouterGuard } from "@/router/guard"

function bootstrap() {
    const app = createApp(App)

    // store配置
    setupStore(app)

    // 路由配置
    setupRouter(app);

    // 路由守卫配置
    setupRouterGuard(router)

    app.mount("#app")
}

bootstrap()
