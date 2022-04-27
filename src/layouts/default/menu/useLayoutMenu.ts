import type { Ref } from 'vue';
import type { Menu } from "@/router/types";

import { MenuSplitTyeEnum } from "@/enums/menuEnum"

export function useSplitMenu(splitType: Ref<MenuSplitTyeEnum>){
    const menusRef = ref<Menu[]>([]);
    const { currentRoute } = useRouter();

    return {
        menusRef
    }
}
