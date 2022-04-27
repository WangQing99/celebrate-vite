<script lang="ts">

import { useDesign } from '@/hooks/web/useDesign';
import { propTypes } from '@/utils/propTypes';
import type { PropType } from 'vue';
import { useMenuItem } from './useMenu';

export default defineComponent({
    props: {
        name: {
            type: [String, Number] as PropType<string | number>,
            required: true,
        },
        disabled: propTypes.bool,
    },
    setup(props) {
        const instance = getCurrentInstance();

        const active = ref(false);

        const { getItemStyle } = useMenuItem(instance)

        const { prefixCls } = useDesign('menu');

        const getClass = computed(() => {
            return [
                `${prefixCls}-item`,
                {
                    [`${prefixCls}-item-active`]: unref(active),
                    [`${prefixCls}-item-selected`]: unref(active),
                    [`${prefixCls}-item-disabled`]: !!props.disabled,
                }
            ]
        })

        return {
            getClass,
            getItemStyle
        }
    }
})

</script>

<template>
    <li :class="getClass" :style="getItemStyle">
        <slot></slot>
        <slot name="title"></slot>
    </li>
</template>
