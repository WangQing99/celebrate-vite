<script lang="ts">
import { useDesign } from "@/hooks/web/useDesign";

import Menu from "./components/Menu.vue";
import SimpleSubMenu from "./SimpleSubMenu.vue";

export default defineComponent({
  components: {
    Menu,
    SimpleSubMenu,
  },
  setup() {
    const items = [
      {
        name: "主页面",
        path: "/home",
        icon: "carbon:home",
        children: [
          {
            name: "哇哇哇哇",
            path: "/",
            icon: "carbon:airplay",
            children: [
              {
                name: "主页面",
                path: "/home",
                icon: "carbon:home",
                children: [
                  {
                    name: "哇哇哇哇",
                    path: "/",
                    icon: "carbon:airplay",
                  },
                ],
              },
            ]
          },
        ],
      },
      {
        name: "引导页",
        path: "/setup",
        icon: "carbon:3rd-party-connected",
      }
    ];

    const { prefixCls } = useDesign("simple-menu");

    return {
      items,
      prefixCls,
    };
  },
});
</script>

<template>
  <Menu :class="prefixCls">
    <template v-for="item in items" :key="item.path">
      <SimpleSubMenu :item="item" :parent="true"></SimpleSubMenu>
    </template>
  </Menu>
</template>

<style lang="less">
@import "./index.less";
</style>
