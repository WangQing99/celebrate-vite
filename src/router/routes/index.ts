import type { AppRouteRecordRaw, AppRouteModule } from "@/router/types"

import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';

import { PageEnum } from '@/enums/pageEnum';

// 获取到modules下所有的路由模块
const modules = import.meta.globEager('./modules/**/*.ts');

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
});

// 异步加载路由
export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
        title: 'Root',
    },
};

export const LoginRoute: AppRouteRecordRaw = {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/sys/login/Login.vue'),
    meta: {
        title: "登录"
    },
};

// 没有权限的基础路由
export const basicRoutes = [
    LoginRoute,
    RootRoute,
    PAGE_NOT_FOUND_ROUTE
];
