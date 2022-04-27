import type { RouteMeta } from 'vue-router';


export interface Menu {
    name: string;

    icon?: string;

    path: string;

    children?: Menu[];

    meta?: Partial<RouteMeta>;
}
