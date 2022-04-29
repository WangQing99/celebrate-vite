export const REDIRECT_NAME = 'Redirect';

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const PAGE_NOT_FOUND_NAME = 'PageNotFound';

export const EXCEPTION_COMPONENT = () => import('@/pages/sys/exception/Exception.vue');

/**
 * @description: 默认 layout
 */
 export const LAYOUT = () => import('@/layouts/default/index.vue');


 /**
 * @description: 父级layout
 */
export const getParentLayout = (_name?: string) => {
    return () =>
      new Promise((resolve) => {
        resolve({
          name: PARENT_LAYOUT_NAME,
        });
      });
  };
