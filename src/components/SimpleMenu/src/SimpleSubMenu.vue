<script lang="ts">
import { useDesign } from "@/hooks/web/useDesign";
import { propTypes } from "@/utils/propTypes";

import Icon from "@/components/Icon/index";
import MenuItem from "./components/MenuItem.vue";
import SubMenu from "./components/SubMenuItem.vue";

export default defineComponent({
    components: {
        MenuItem,
        SubMenu,
        Icon,
    },
    props: {
        parent: propTypes.bool,
    },
    setup(props) {
        const { prefixCls } = useDesign("simple-menu");

        // 判断是不是父级菜单，添加相应的class
        const getLevelClass = computed(() => {
            return [
                {
                    [`${prefixCls}__parent`]: props.parent,
                    [`${prefixCls}__children`]: !props.parent,
                },
            ];
        });

        return {
            prefixCls,
            getLevelClass,
        };
    },
});
</script>

<template>
    <MenuItem :class="getLevelClass" name="">
    <Icon icon="carbon-airplay" :size="16" />
    <template #title>
        <span :class="['ml-2', `${prefixCls}-sub-title`]">
            哇哇哇哇
        </span>
    </template>
    </MenuItem>
</template>
