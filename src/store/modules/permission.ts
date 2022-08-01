import type { Menu, AppRouteRecordRaw } from "@/router/types"

import { store } from '@/store';
import { defineStore } from 'pinia';

import { transformRouteToMenu } from '@/router/helper/menuHelper';
import { flatMultiLevelRoutes, transformObjToRoute } from '@/router/helper/routeHelper';
import { filter } from '@/utils/helper/treeHelper';
import { useMessage } from "@/hooks/web/useMessage"
import { getMenuList } from '@/api/sys/menu';
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';

interface PermissionState {
    isDynamicAddedRoute: boolean;
    backMenuList: Menu[];
    frontMenuList: Menu[];
}

export const usePermissionStore = defineStore({
    id: 'app-permission',
    state: (): PermissionState => ({
        backMenuList: [],
        isDynamicAddedRoute: false,
        // menu List
        frontMenuList: [],
    }),
    getters: {
        getBackMenuList(): Menu[] {
            return this.backMenuList;
        },
        getFrontMenuList(): Menu[] {
            return this.frontMenuList;
        },
        getIsDynamicAddedRoute(): boolean {
            return this.isDynamicAddedRoute;
        },
    },
    actions: {
        setBackMenuList(list: Menu[]) {
            this.backMenuList = list;
        },
        setFrontMenuList(list: Menu[]) {
            this.frontMenuList = list;
        },
        setDynamicAddedRoute(added: boolean) {
            this.isDynamicAddedRoute = added;
        },
        async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
            let routes: AppRouteRecordRaw[] = [];

            // 过滤掉需要忽略的路由
            const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
                const { meta } = route;
                const { ignoreRoute } = meta || {};
                return !ignoreRoute;
            };

            const { createMessage } = useMessage();

            createMessage.loading({
                content: "菜单加载中...",
                duration: 1,
            });

            let routeList: AppRouteRecordRaw[] = [];
            // 查询接口获取菜单
            try {
                routeList = (await getMenuList()) as AppRouteRecordRaw[];
            } catch (error) {
                console.error(error);
            }
            // 动态导入组件
            routeList = transformObjToRoute(routeList);
            // 后台路由到菜单结构
            const backMenuList = transformRouteToMenu(routeList);
            this.setBackMenuList(backMenuList);

            // 删除 meta.ignoreRoute 路由
            routeList = filter(routeList, routeRemoveIgnoreFilter);

            // 将多级路由转换为 2 级路由
            routeList = flatMultiLevelRoutes(routeList);
            routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];

            return routes;
        }
    }
})


export function usePermissionStoreWithOut() {
    return usePermissionStore(store);
}
