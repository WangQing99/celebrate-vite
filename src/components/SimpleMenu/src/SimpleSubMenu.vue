<script lang="ts">
import type { PropType } from "vue";
import type { Menu } from "@/router/types";
import { useDesign } from "@/hooks/web/useDesign";
import { propTypes } from "@/utils/propTypes";

import Icon from "@/components/Icon/index";
import MenuItem from "./components/MenuItem.vue";
import SubMenu from "./components/SubMenuItem.vue";

export default defineComponent({
  name: "SimpleSubMenu",
  components: {
    MenuItem,
    SubMenu,
    Icon,
  },
  props: {
    item: {
      type: Object as PropType<Menu>,
      default: () => ({}),
    },
    parent: propTypes.bool,
  },
  setup(props) {
    const { prefixCls } = useDesign("simple-menu");

    const getIcon = computed(() => props.item?.icon);
    // 判断是不是父级菜单，添加相应的class
    const getLevelClass = computed(() => {
      return [
        {
          [`${prefixCls}__parent`]: props.parent,
          [`${prefixCls}__children`]: !props.parent,
        },
      ];
    });

    function menuHasChildren(menuTreeItem: Menu): boolean {
      return (
        !menuTreeItem.meta?.hideChildrenInMenu &&
        Reflect.has(menuTreeItem, "children") &&
        !!menuTreeItem.children &&
        menuTreeItem.children.length > 0
      );
    }

    return {
      prefixCls,
      getLevelClass,
      getIcon,
      menuHasChildren,
    };
  },
});
</script>

<template>
  <MenuItem
    :name="item.path"
    v-if="!menuHasChildren(item)"
    :class="getLevelClass"
  >
    <Icon v-if="getIcon" :icon="getIcon" :size="16" />
    <template #title>
      <span :class="['ml-2', `${prefixCls}-sub-title`]"> {{ item.name }} </span>
    </template>
  </MenuItem>
  <SubMenu
    :name="item.path"
    v-if="menuHasChildren(item)"
    :class="[getLevelClass]"
  >
    <template #title>
      <Icon v-if="getIcon" :icon="getIcon" :size="16" />
      <span :class="['ml-2', `${prefixCls}-sub-title`]">
        {{ item.name }}
      </span>
    </template>
    <template
      v-for="childrenItem in item.children || []"
      :key="childrenItem.path"
    >
      <SimpleSubMenu :item="childrenItem" :parent="false" />
    </template>
  </SubMenu>
</template>
