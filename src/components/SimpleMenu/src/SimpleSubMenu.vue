<script lang='ts'>
import MenuItem from './components/MenuItem.vue';
import SubMenu from './components/SubMenuItem.vue';

export default defineComponent({
    components: {
        MenuItem,
        SubMenu
    },
    setup(props) {


        // 判断是不是父级菜单，添加相应的class
        const getLevelClass = computed(() => {
            return [

            ]
        })

        return {
            getLevelClass
        }
    }
})
</script>

<template>
    <MenuItem :class="getLevelClass">
    </MenuItem>
</template>
