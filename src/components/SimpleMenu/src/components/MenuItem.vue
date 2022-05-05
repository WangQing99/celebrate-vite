<script lang="ts">
import type { PropType } from 'vue';

import { useDesign } from '@/hooks/web/useDesign';
import { propTypes } from '@/utils/propTypes';
import { useMenuItem } from './useMenu';
import { useSimpleRootMenuContext } from './useSimpleMenuContext';

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

        const { getItemStyle, getParentList } = useMenuItem(instance)

        const { prefixCls } = useDesign('menu');

        const { rootMenuEmitter, activeName } = useSimpleRootMenuContext()

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

        function handleClickItem() {
            rootMenuEmitter.emit('on-menu-item-select', props.name);
        }

        watch(
            () => activeName.value,
            (name) => {
                if (name === props.name) {
                    const { list, uidList } = getParentList();
                    active.value = true;
                    list.forEach((item) => {
                        if (item.proxy) {
                            (item.proxy as any).active = true;
                        }
                    });

                    rootMenuEmitter.emit('on-update-active-name:submenu', uidList);
                } else {
                    active.value = false;
                }
            },
            { immediate: true },
        );

        return {
            getClass,
            getItemStyle,
            handleClickItem
        }
    }
})

</script>

<template>
    <li :class="getClass" @click.stop="handleClickItem" :style="getItemStyle">
        <slot></slot>
        <slot name="title"></slot>
    </li>
</template>
