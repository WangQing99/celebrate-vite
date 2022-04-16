<script lang='ts'>
import { propTypes } from '@/utils/propTypes';

import { Layout } from "ant-design-vue";
import { useDesign } from '@/hooks/web/useDesign';

export default defineComponent({
    name: "LayoutHeader",
    components: {
        Header: Layout.Header
    },
    props: {
        fixed: propTypes.bool
    },
    setup(props) {

        const { prefixCls } = useDesign('layout-header')

        const getHeaderClass = computed(() => {
            return [
                prefixCls,
                {
                    [`${prefixCls}--fixed`]: props.fixed
                }
            ]
        })

        console.log(getHeaderClass.value);

        return {
            getHeaderClass
        }
    }
})
</script>

<template>
    <Header :class="getHeaderClass">
        <div></div>
        <div></div>
    </Header>
</template>

<style lang='less'>
@import "./index.less";
</style>
