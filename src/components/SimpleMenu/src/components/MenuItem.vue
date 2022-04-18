<script lang="ts">

import { useDesign } from '@/hooks/web/useDesign';
import { propTypes } from '@/utils/propTypes';
import type { PropType } from 'vue';

export default defineComponent({
    props: {
        name: {
            type: [String, Number] as PropType<string | number>,
            required: true,
        },
        disabled: propTypes.bool,
    },
    setup(props) {

        const active = ref(false);

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
            getClass
        }
    }
})

</script>

<template>
    <li :class="getClass">
        <slot></slot>
        <slot name="title"></slot>
    </li>
</template>
