<script lang="ts">
import { createAppProviderContext } from './useAppContext';
import { prefixCls } from "@/settings/designSetting";

const props = {
    /**
    * class style prefix
    */
    prefixCls: { type: String, default: prefixCls }
}


export default defineComponent({
    name: "AppProvider",
    inheritAttrs: false,
    props,
    setup(props, { slots }) {

        const isMobile = ref(false); // 是否是移动端

        const { prefixCls } = toRefs(props);

        // 注入全局变量
        createAppProviderContext({ prefixCls, isMobile });

        return () => slots.default?.();
    }
})
</script>
