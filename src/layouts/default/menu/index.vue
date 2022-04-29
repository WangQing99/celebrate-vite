<script lang="tsx">
import type { PropType } from "vue"

import { SimpleMenu } from '@/components/SimpleMenu';

import { MenuSplitTyeEnum } from "@/enums/menuEnum"

import { useSplitMenu } from './useLayoutMenu';
import { useGo } from '@/hooks/web/usePage';

export default defineComponent({
    name: "LayoutMenu",
    props: {
        splitType: {
            type: Number as PropType<MenuSplitTyeEnum>,
            default: MenuSplitTyeEnum.NONE
        }
    },
    setup(props) {
        const go = useGo();

        const { menusRef } = useSplitMenu(toRef(props, 'splitType'));

        const getCommonProps = computed(() => {
            const menus = unref(menusRef);
            return {
                menus,
                onMenuClick: handleMenuClick,
            };
        });

        /**
         * 点击菜单
         */
        function handleMenuClick(path: string) {
            go(path);
        }

        function renderMenu() {
            const { menus, ...menuProps } = unref(getCommonProps);
            return (
                <SimpleMenu {...menuProps} items={menus} />
            )
        }

        return () => (
            <>
                {renderMenu()}
            </>
        )
    }
})
</script>
