<script lang='ts'>
import { useDesign } from '@/hooks/web/useDesign';

import Menu from './components/Menu.vue';
import SimpleSubMenu from './SimpleSubMenu.vue';

export default defineComponent({
    components: {
        Menu,
        SimpleSubMenu
    },
    setup() {

        const { prefixCls } = useDesign("simple-menu")

        return {
            prefixCls
        }
    }
})
</script>

<template>
    <Menu :class="prefixCls">
        <SimpleSubMenu :parent="true"></SimpleSubMenu>
    </Menu>
</template>

<style lang="less">
@import "./index.less";
</style>
