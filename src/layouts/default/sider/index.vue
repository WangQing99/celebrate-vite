<script lang='ts'>
import { Drawer } from 'ant-design-vue';

import Sider from './LayoutSider.vue';

import { useDesign } from '@/hooks/web/useDesign';

export default defineComponent({
    name: "SiderWrapper",
    components: {
        Drawer,
        Sider
    },
    setup() {
        const { prefixCls } = useDesign('layout-sider-wrapper');

        return {
            prefixCls
        }
    }
})
</script>

<template>
    <Sider />
</template>


<style lang="less">
@prefix-cls: ~'@{namespace}-layout-sider-wrapper';

.@{prefix-cls} {
    .ant-drawer-body {
        height: 100vh;
        padding: 0;
    }

    .ant-drawer-header-no-title {
        display: none;
    }
}
</style>
