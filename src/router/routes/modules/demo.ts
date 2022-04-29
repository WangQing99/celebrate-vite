import type { AppRouteModule } from '@/router/types';

import { getParentLayout, LAYOUT } from '@/router/constant';

const permission: AppRouteModule = {
    path: "/level",
    name: 'Level',
    component: LAYOUT,
    redirect: '/level/menu1/menu1-1/menu1-1-1',
    meta: {
        icon: 'carbon:menu',
        title: "测试多层级",
    },
    children: [
        {
            path: 'menu1',
            name: 'Menu1Demo',
            component: getParentLayout('Menu1Demo'),
            meta: {
                title: 'Menu1'
            },
            redirect: '/level/menu1/menu1-1/menu1-1-1',
            children: [
                {
                    path: 'menu1-1',
                    name: 'Menu11Demo',
                    component: getParentLayout('Menu11Demo'),
                    meta: {
                        title: 'Menu1-1',
                    },
                    redirect: '/level/menu1/menu1-1/menu1-1-1',
                    children: [
                        {
                            path: 'menu1-1-1',
                            name: 'Menu111Demo',
                            component: () => import('@/pages/demo/level/Menu111.vue'),
                            meta: {
                                title: 'Menu111',
                            },
                        },
                    ],
                },
                {
                    path: 'menu1-2',
                    name: 'Menu12Demo',
                    component: () => import('@/pages/demo/level/Menu12.vue'),
                    meta: {
                        title: 'Menu1-2'
                    }
                },
            ],
        },
        {
            path: 'menu2',
            name: 'Menu2Demo',
            component: () => import('@/pages/demo/level/Menu2.vue'),
            meta: {
                title: 'Menu2',
            },
        },
    ]
}


export default permission;
