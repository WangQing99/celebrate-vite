import type { RouteLocationRaw, Router } from 'vue-router';

import { PageEnum } from '@/enums/pageEnum';
import { isString } from '@/utils/is';

export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum };

function handleError(e: Error) {
    console.error(e);
}

// page switch
export function useGo(_router?: Router) {
    let router;
    if (!_router) {
        router = useRouter();
    }
    const { push, replace } = _router || router;
    function go(opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME, isReplace = false) {
        if (!opt) {
            return;
        }
        if (isString(opt)) {
            isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError);
        } else {
            const o = opt as RouteLocationRaw;
            isReplace ? replace(o).catch(handleError) : push(o).catch(handleError);
        }
    }
    return go;
}
