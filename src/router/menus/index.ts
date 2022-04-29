import type { Menu } from '@/router/types';

import { usePermissionStore } from '@/store/modules/permission';

async function getAsyncMenus() {
    const permissionStore = usePermissionStore();
    return permissionStore.getBackMenuList.filter((item) => !item.meta?.hideMenu && !item.hideMenu);
}

export const getMenus = async (): Promise<Menu[]> => {
    const menus = await getAsyncMenus();
    return menus;
};
