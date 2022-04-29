<script lang="ts">
import { useDesign } from '@/hooks/web/useDesign';

export default defineComponent({
    name: "DefaultLayout",
    setup() {
        const { prefixCls } = useDesign('layout-content');


        return {
            prefixCls
        }
    }
})
</script>

<template>
    <div :class="[prefixCls]">
        <div style="height:80px;"></div>
        <RouterView>
            <template #default="{ Component, route }">
                <component :is="Component" :key="route.fullPath" />
            </template>
        </RouterView>
    </div>
</template>

<style lang="less">
@prefix-cls: ~'@{namespace}-layout-content';

.@{prefix-cls} {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;

    &.fixed {
        width: 1200px;
        margin: 0 auto;
    }
}
</style>
