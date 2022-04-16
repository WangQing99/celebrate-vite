<script lang='ts'>
import { Layout } from 'ant-design-vue';

export default defineComponent({
    name: "LayoutSideBar",
    components: {
        Sider: Layout.Sider
    }
})
</script>

<template>
    <Sider></Sider>
</template>
