<script lang="ts">

import { useDesign } from '@/hooks/web/useDesign';
import { propTypes } from '@/utils/propTypes';

export default defineComponent({
    name: 'Menu',
    props: {
        indentSize: propTypes.number.def(16),
        collapse:propTypes.bool.def(false),
    },
    setup() {

        const { prefixCls } = useDesign('menu');

        const getClass = computed(() => {
            return [
                prefixCls,
                `${prefixCls}-vertical`
            ];
        });

        return {
            getClass
        }
    }
})
</script>

<template>
    <ul :class="getClass">
        <slot></slot>
    </ul>
</template>

<style lang="less">
@import "./menu.less";
</style>
