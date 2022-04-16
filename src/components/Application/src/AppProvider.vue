<script lang="ts">
import { createAppProviderContext } from './useAppContext';
import { prefixCls } from "@/settings/designSetting.ts";

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

        // 注入全局变量
        createAppProviderContext({ prefixCls });

        return () => slots.default?.();
    }
})
</script>
