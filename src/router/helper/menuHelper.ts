import type { AppRouteModule, Menu, AppRouteRecordRaw } from '@/router/types';

import { cloneDeep } from 'lodash-es';

import { treeMap } from '@/utils/helper/treeHelper';
import { isUrl } from '@/utils/is';


function joinParentPath(menus: Menu[], parentPath = '') {
    for (let index = 0; index < menus.length; index++) {
        const menu = menus[index];
        // 请注意，以 / 开头的嵌套路径将被视为根路径。这允许您利用组件嵌套，而无需使用嵌套 URL
        if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
            // 路径不以 / 开头，也不是 url，加入父路径
            menu.path = `${parentPath}/${menu.path}`;
        }
        if (menu?.children?.length) {
            joinParentPath(menu.children, menu.meta?.hidePathForChildren ? parentPath : menu.path);
        }
    }
}

/**
 * 把路由转换为菜单
 */
export function transformRouteToMenu(routeModList: AppRouteModule[], routerMapping = false) {
    const cloneRouteModList = cloneDeep(routeModList);
    const routeList: AppRouteRecordRaw[] = [];

    cloneRouteModList.forEach((item) => {
        if (routerMapping && item.meta.hideChildrenInMenu && typeof item.redirect === 'string') {
            item.path = item.redirect;
        }
        if (item.meta?.single) {
            const realItem = item?.children?.[0];
            realItem && routeList.push(realItem);
        } else {
            routeList.push(item);
        }
    });
    const list = treeMap(routeList, {
        conversion: (node: AppRouteRecordRaw) => {
            const { meta: { title, hideMenu = false } = {} } = node;

            return {
                ...(node.meta || {}),
                meta: node.meta,
                name: title,
                hideMenu,
                path: node.path,
                ...(node.redirect ? { redirect: node.redirect } : {}),
            };
        },
    });
    joinParentPath(list);
    return cloneDeep(list);
}
