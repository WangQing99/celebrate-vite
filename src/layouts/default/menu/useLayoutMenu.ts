import type { Ref } from 'vue';
import type { Menu } from "@/router/types";

import { MenuSplitTyeEnum } from "@/enums/menuEnum"
import { getMenus } from '@/router/menus';
import { usePermissionStore } from '@/store/modules/permission';

export function useSplitMenu(splitType: Ref<MenuSplitTyeEnum>) {
    const menusRef = ref<Menu[]>([]);
    const permissionStore = usePermissionStore()

    watch(
        () => permissionStore.getBackMenuList,
        () => {
            genMenus();
        },
        {
            immediate: true,
        },
    );

    async function genMenus() {
        menusRef.value = await getMenus();
    }

    return {
        menusRef
    }
}
