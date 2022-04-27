<script lang="ts">
import { useDesign } from "@/hooks/web/useDesign";

export default defineComponent({
  name: "SubMenu",
  setup() {
    const state = reactive({
      active: false,
      opened: false,
    });

    const { prefixCls } = useDesign("menu");

    /**
     * 获取类名
     */
    const getClass = computed(() => {
      return [
        `${prefixCls}-submenu`,
        {
          [`${prefixCls}-item-active`]: state.active,
          [`${prefixCls}-opened`]: state.opened,
          [`${prefixCls}-child-item-active`]: state.active,
        },
      ];
    });

    /**
     * 点击菜单
     */
    function handleClick() {
      const opened = state.opened;
      state.opened = !opened;
    }

    return {
      prefixCls,
      getClass,
      handleClick,
      ...toRefs(state),
    };
  },
});
</script>

<template>
  <li :class="getClass">
    <div
      :class="`${prefixCls}-submenu-title`"
      @click.stop="handleClick"
      style="padding-left: 16px"
    >
      <slot name="title"></slot>
      <Icon
        icon="carbon:chevron-down"
        :size="14"
        :class="`${prefixCls}-submenu-title-icon`"
      />
    </div>
    <ul :class="prefixCls" v-show="opened">
      <slot></slot>
    </ul>
  </li>
</template>
