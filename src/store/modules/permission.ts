import type { Menu, AppRouteRecordRaw } from "@/router/types"

import { store } from '@/store';
import { defineStore } from 'pinia';

import { asyncRoutes } from '@/router/routes';
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
            try {
                routeList = (await getMenuList()) as AppRouteRecordRaw[];
            } catch (error) {
                console.error(error);
            }

            // Dynamically introduce components
            routeList = transformObjToRoute(routeList);
            //  Background routing to menu structure
            const backMenuList = transformRouteToMenu(routeList);
            this.setBackMenuList(backMenuList);

            // remove meta.ignoreRoute item
            routeList = filter(routeList, routeRemoveIgnoreFilter);
            routeList = routeList.filter(routeRemoveIgnoreFilter);

            routeList = flatMultiLevelRoutes(routeList);
            routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];

            return routes;
        }
    }
})


export function usePermissionStoreWithOut() {
    return usePermissionStore(store);
}
