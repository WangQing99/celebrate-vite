import type { ComponentInternalInstance, CSSProperties } from "vue";

export function useMenuItem(instance: ComponentInternalInstance | null) {


    /**
     * 获取到菜单根组件 Menu组件
     */
    const getParentRootMenu = computed(() => {
        return findParentMenu(["Menu"]);
    });

    /**
     * 计算菜单左侧的padding-left
     */
    const getItemStyle = computed((): CSSProperties => {
        let parent = instance?.parent;
        if (!parent) return {};
        // 找到父组件的缩进size，找不到默认20
        const indentSize =
            (unref(getParentRootMenu)?.props.indentSize as number) ?? 20;
        let padding = indentSize;
        
        // 如果菜单是缩起状态，那padding都一致
        if (unref(getParentRootMenu)?.props.collapse) {
            padding = indentSize;
        } else {
            // 如果是展开状态，则需要一直向上寻找有几级父级每次加一个缩进，直到找到Menu组件为止
            while (parent && parent.type.name !== "Menu") {
                if (parent.type.name === "SubMenu") {
                    padding += indentSize;
                }
                parent = parent.parent;
            }
        }

        return {
            paddingLeft: padding + "px",
        };
    });

    /**
     * 
     * @param name 组件name
     * @returns 找到的菜单实例
     */
    function findParentMenu(name: string[]) {
        let parent = instance?.parent;
        if (!parent) return null;
        while (parent && name.indexOf(parent.type.name!) === -1) {
            parent = parent.parent;
        }
        return parent;
    }

    function getParentList() {
        let parent = instance;
        if (!parent)
          return {
            uidList: [],
            list: [],
          };
        const ret: any[] = [];
        while (parent && parent.type.name !== 'Menu') {
          if (parent.type.name === 'SubMenu') {
            ret.push(parent);
          }
          parent = parent.parent;
        }
        return {
          uidList: ret.map((item) => item.uid),
          list: ret,
        };
      }


    return {
        getItemStyle,
        getParentList
    }
}
