import '@unocss/reset/tailwind.css'
import 'uno.css'

import { createApp } from "vue"
import App from "./App.vue"
import { setupRouter } from "./router";
import { setupStore } from './store'

function bootstrap() {
    const app = createApp(App)

    // 路由配置
    setupRouter(app);

    // store配置l
    setupStore(app)

    app.mount("#app")
}

bootstrap()
