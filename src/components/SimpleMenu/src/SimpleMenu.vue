<script lang="ts">
import type { Menu as MenuType } from '@/router/types';

import { useDesign } from "@/hooks/web/useDesign";

import Menu from "./components/Menu.vue";
import SimpleSubMenu from "./SimpleSubMenu.vue";

export default defineComponent({
  components: {
    Menu,
    SimpleSubMenu,
  },
  inheritAttrs: false,
  props: {
    items: {
      type: Array as PropType<MenuType[]>,
      default: () => [],
    },
  },
  emits: ['menuClick'],
  setup(props,{ emit }) {
    const isClickGo = ref(false);

    const { prefixCls } = useDesign("simple-menu");

    async function handleSelect(key: string) {
        emit('menuClick', key);

        isClickGo.value = true;
      }

    return {
      prefixCls,
      handleSelect
    };
  },
});
</script>

<template>
  <Menu :class="prefixCls" @select="handleSelect">
    <template v-for="item in items" :key="item.path">
      <SimpleSubMenu :item="item" :parent="true"></SimpleSubMenu>
    </template>
  </Menu>
</template>

<style lang="less">
@import "./index.less";
</style>
