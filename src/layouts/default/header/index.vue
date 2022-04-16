<script lang='ts'>
import { Layout } from "ant-design-vue";


export default defineComponent({
    name: "LayoutHeader",
    components: {
        Header: Layout.Header
    }
})
</script>

<template>
    <Header class="celebrate-layout-header celebrate-layout-header--fixed">
        <div></div>
        <div></div>
    </Header>
</template>

<style lang='less'>
@import "./index.less";
</style>
