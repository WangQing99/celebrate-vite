<script lang="ts">
import { useDesign } from "@/hooks/web/useDesign";
import { propTypes } from "@/utils/propTypes";
import { createSimpleRootMenuContext } from "./useSimpleMenuContext";
import mitt from "@/utils/mitt";

export default defineComponent({
    name: "Menu",
    props: {
        indentSize: propTypes.number.def(16),
        collapse: propTypes.bool.def(false),
    },
    emits: ["select"],
    setup(props, { emit }) {
        const rootMenuEmitter = mitt();

        const currentActiveName = ref<string | number>("");

        const { prefixCls } = useDesign("menu");

        createSimpleRootMenuContext({
            rootMenuEmitter: rootMenuEmitter,
            activeName: currentActiveName,
        });

        const getClass = computed(() => {
            return [prefixCls, `${prefixCls}-vertical`];
        });

        onMounted(() => {
            rootMenuEmitter.on("on-menu-item-select", name => {
                emit("select",name);
            });
        });

        return {
            getClass,
        };
    },
});
</script>

<template>
    <ul :class="getClass">
        <slot></slot>
    </ul>
</template>

<style lang="less">
@import "./menu.less";
</style>
