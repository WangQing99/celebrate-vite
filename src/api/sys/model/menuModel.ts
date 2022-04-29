import type { RouteMeta } from 'vue-router';
export interface RouteItem {
  path: string;
  meta: RouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  children?: RouteItem[];
}

export type getMenuListResultModel = RouteItem[];
