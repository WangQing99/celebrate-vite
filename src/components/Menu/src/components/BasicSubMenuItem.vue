<script lang='ts'>
import { Menu } from 'ant-design-vue';

export default defineComponent({
    name: 'BasicSubMenuItem',
    components: {
        SubMenu: Menu.SubMenu
    }
})
</script>

<template>
    <SubMenu key="sub2">
        <template #title>Navigation Three</template>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-menu-item key="11">Option 11</a-menu-item>
        <a-menu-item key="12">Option 12</a-menu-item>
    </SubMenu>
</template>
