<script lang='ts'>
import { Menu } from 'ant-design-vue';
import BasicSubMenuItem from './components/BasicSubMenuItem.vue';

export default defineComponent({
    name: 'BasicMenu',
    components: {
        Menu,
        BasicSubMenuItem
    },
    setup() {
        const state = reactive({
            rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
            openKeys: ['sub2'],
            selectedKeys: [],
        })

        return {
            ...toRefs(state),
        }
    }
})
</script>

<template>
    <Menu mode="inline" :open-keys="openKeys">
        <BasicSubMenuItem></BasicSubMenuItem>
    </Menu>
</template>

<style lang='less'>
@import "./index.less";
</style>    
