import type { Menu, AppRouteRecordRaw } from "@/router/types"

import { store } from '@/store';
import { defineStore } from 'pinia';

import { asyncRoutes } from '@/router/routes';

import { filter } from '@/utils/helper/treeHelper';
import { transformRouteToMenu } from '@/utils/helper/menuHelper';

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

            // 路由过滤条件
            const routeFilter = () => {
                return true;
            };

            routes = filter(asyncRoutes, routeFilter);
            routes = routes.filter(routeFilter);
            const menuList = transformRouteToMenu(routes, true);
            
            this.setBackMenuList(menuList);

            return routes;
        }
    }
})


export function usePermissionStoreWithOut() {
    return usePermissionStore(store);
}
