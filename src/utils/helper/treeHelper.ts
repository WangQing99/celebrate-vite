interface TreeHelperConfig {
    id: string;
    children: string;
    pid: string;
}

const DEFAULT_CONFIG: TreeHelperConfig = {
    id: 'id',
    children: 'children',
    pid: 'pid',
};

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config);

export function filter<T = any>(
    tree: T[],
    func: (n: T) => boolean,
    config: Partial<TreeHelperConfig> = {},
): T[] {
    config = getConfig(config);
    const children = config.children as string;
    function listFilter(list: T[]) {
        return list
            .map((node: any) => ({ ...node }))
            .filter((node) => {
                node[children] = node[children] && listFilter(node[children]);
                return func(node) || (node[children] && node[children].length);
            });
    }
    return listFilter(tree);
}

/**
 * @description: 提取树指定结构
 */
export function treeMap<T = any>(treeData: T[], opt: { children?: string; conversion: Fn }): T[] {
    return treeData.map((item) => treeMapEach(item, opt));
}


/**
 * @description: 提取树指定结构
 */
export function treeMapEach(
    data: any,
    { children = 'children', conversion }: { children?: string; conversion: Fn },
) {
    const haveChildren = Array.isArray(data[children]) && data[children].length > 0;
    const conversionData = conversion(data) || {};
    if (haveChildren) {
        return {
            ...conversionData,
            [children]: data[children].map((i: number) =>
                treeMapEach(i, {
                    children,
                    conversion,
                }),
            ),
        };
    } else {
        return {
            ...conversionData,
        };
    }
}
