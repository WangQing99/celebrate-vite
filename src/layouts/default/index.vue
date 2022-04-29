<script lang="ts">
import { Layout } from 'ant-design-vue';

import LayoutSideBar from "./sider/index.vue";
import LayoutContent from './content/index.vue';
import LayoutHeader from './header/index.vue';

import { useDesign } from '@/hooks/web/useDesign';

export default defineComponent({
    name: "DefaultLayout",
    components: {
        Layout,
        LayoutHeader,
        LayoutSideBar,
        LayoutContent
    },
    setup() {
        const { prefixCls } = useDesign('default-layout');

        const layoutClass = computed(() => {
            let cls: string[] = ['ant-layout'];
            cls.push('ant-layout-has-sider');
            return cls;
        });

        return {
            prefixCls,
            layoutClass
        }
    }
})
</script>

<template>
    <Layout :class="prefixCls">
        <LayoutHeader fixed></LayoutHeader>
        <Layout :class="[layoutClass]">
            <LayoutSideBar></LayoutSideBar>
            <Layout :class="`${prefixCls}-main`">
                <LayoutContent />
            </Layout>
        </Layout>
    </Layout>
</template>

<style lang="less">
@prefix-cls: ~'@{namespace}-default-layout';

.@{prefix-cls} {
    display: flex;
    width: 100%;
    min-height: 100%;
    background-color: @content-bg;
    flex-direction: column;

    >.ant-layout {
        min-height: 100%;
    }

    &-main {
        width: 100%;
        margin-left: 1px;
    }
}
</style>
