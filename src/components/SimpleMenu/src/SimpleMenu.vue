<script lang='ts'>
import Menu from './components/Menu.vue';
import SimpleSubMenu from './SimpleSubMenu.vue';

export default defineComponent({
    components: {
        Menu,
        SimpleSubMenu
    }
})
</script>

<template>
    <Menu class='celebrate-simple-menu'>
        <SimpleSubMenu>

        </SimpleSubMenu>
    </Menu>
</template>
