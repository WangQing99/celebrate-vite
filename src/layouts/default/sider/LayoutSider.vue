<script lang='ts'>
import type { CSSProperties } from 'vue';
import { Layout } from 'ant-design-vue';
import LayoutMenu from "../menu/index.vue"
import { useDesign } from "@/hooks/web/useDesign"

export default defineComponent({
    name: "LayoutSideBar",
    components: {
        Sider: Layout.Sider,
        LayoutMenu
    },
    setup() {

        const { prefixCls } = useDesign("layout-sideBar")

        const getSiderClass = computed(() => {
            return [
                prefixCls,
                `${prefixCls}--fixed`,
                `${prefixCls}--mix`
            ]
        })

        const getHiddenDomStyle = computed((): CSSProperties => {
        const width = `200px`;
        return {
          width: width,
          overflow: 'hidden',
          flex: `0 0 ${width}`,
          maxWidth: width,
          minWidth: width,
          transition: 'all 0.2s',
        };
      });

        return {
            getSiderClass,
            getHiddenDomStyle
        }
    }
})

</script>

<template>
    <div :style="getHiddenDomStyle">
        <Sider :class="getSiderClass">
            <LayoutMenu></LayoutMenu>
        </Sider>
    </div>
</template>

<style lang="less">
@prefix-cls: ~'@{namespace}-layout-sideBar';

.@{prefix-cls} {
    z-index: @layout-sider-fixed-z-index;

    &--fixed {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
    }

    &--mix {
        top: @header-height;
        height: calc(100% - @header-height);
    }

    &.ant-layout-sider-dark {
        background-color: @sider-dark-bg-color;

        .ant-layout-sider-trigger {
            color: darken(@white, 25%);
            background-color: @trigger-dark-bg-color;

            &:hover {
                color: @white;
                background-color: @trigger-dark-hover-bg-color;
            }
        }
    }

    &:not(.ant-layout-sider-dark) {

        .ant-layout-sider-trigger {
            color: @text-color-base;
            border-top: 1px solid @border-color-light;
        }
    }

    .ant-layout-sider-zero-width-trigger {
        top: 40%;
        z-index: 10;
    }

    & .ant-layout-sider-trigger {
        height: 36px;
        line-height: 36px;
    }
}
</style>
