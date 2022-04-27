<script lang="tsx">
import type { PropType } from "vue"

import { SimpleMenu } from '@/components/SimpleMenu';

import { MenuSplitTyeEnum } from "@/enums/menuEnum"

import { useSplitMenu } from './useLayoutMenu';

export default defineComponent({
    name: "LayoutMenu",
    props: {
        splitType: {
            type: Number as PropType<MenuSplitTyeEnum>,
            default: MenuSplitTyeEnum.NONE
        }
    },
    setup(props) {

        const { menusRef } = useSplitMenu(toRef(props, 'splitType'));

        console.log(menusRef);

        function renderMenu() {
            return (
                <SimpleMenu />
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
