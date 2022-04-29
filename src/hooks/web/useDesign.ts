import { useAppProviderContext } from '@/components/Application';

/**
 * prefixCls：全局前缀+传入的类名
 * prefixVar：全局前缀定义
 */
export function useDesign(scope: string) {
    const values = useAppProviderContext();
    return {
        prefixCls: `${values.prefixCls}-${scope}`,
        prefixVar: values.prefixCls,
    };
}
