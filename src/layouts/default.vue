<script lang="ts">
import { Layout } from 'ant-design-vue';
import LayoutSideBar from "./default/sider/index.vue";
import LayoutHeader from './default/header/index.vue';

export default defineComponent({
    name: "DefaultLayout",
    components: {
        Layout,
        LayoutHeader,
        LayoutSideBar
    }
})
</script>

<template>
    <Layout>
        <LayoutHeader fixed></LayoutHeader>
        <Layout>
            <LayoutSideBar></LayoutSideBar>
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
