import type { Router, RouteRecordRaw } from 'vue-router';

import { usePermissionStoreWithOut } from "@/store/modules/permission";
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';

export function createPermissionGuard(router: Router) {
    router.beforeEach(async (to, from, next) => {
        const permissionStore = usePermissionStoreWithOut();

        // 判断有没有添加过动态路由，添加过了直接跳过
        if (permissionStore.getIsDynamicAddedRoute) {
            next();
            return;
        }

        const routes = await permissionStore.buildRoutesAction();

        routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
        });

        router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);

        permissionStore.setDynamicAddedRoute(true);

        if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
            // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
            next({ path: to.fullPath, replace: true, query: to.query });
        } else {
            const redirectPath = (from.query.redirect || to.path) as string;
            const redirect = decodeURIComponent(redirectPath);
            const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
            next(nextData);
        }
    })
}
