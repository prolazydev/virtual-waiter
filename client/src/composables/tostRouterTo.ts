import type { RouteNamedMap } from 'vue-router/auto-routes';
import type { Router } from 'vue-router';

/**
 * Navigate to a new route and display a tost message
 * @param router 	- Typed Router
 * @param path 		- Typed path to navigate
 * @param params 	- Typed Params to replace in path
 * @param message 	- Message to display in tost
 * @param timeout 	- Time to display tost. Default: 3000ms
 * @returns 		Promise<void>
 */
export default async <T extends keyof RouteNamedMap>(router: Router, path: T , params: RouteNamedMap[T]['params'], message: string, timeout: number = 3000) => {
    try {        
        await router.push(replaceWithValues(path, params)!)
        
        useTost(message, timeout);
    } catch (error) {
        console.log(error);
    }
}
		

const replaceWithValues = (path: keyof RouteNamedMap, params: any): keyof RouteNamedMap => {
    if (!params || params === undefined || params === null || Object.keys(params).length === 0) 
        return path;
    
    let computedPath = path;
    for (const key in params) 
        computedPath = computedPath.replace(`[${key}]`, params[key]) as keyof RouteNamedMap;

    return computedPath;
}