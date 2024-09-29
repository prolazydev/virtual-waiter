import type { RouteNamedMap } from 'vue-router/auto-routes';
import type { RouteLocationAsRelativeTyped, RouteLocationRaw, RouteMapGeneric, RouteParamValueRaw, Router } from 'vue-router/auto';

/**
 * Navigate to a new route and display a tost message
 * @param router 	- Typed Router
 * @param path 		- Typed path to navigate
 * @param params? 	- Typed Params to replace in path
 * @param message 	- Message to display in tost
 * @param timeout 	- Time to display tost. Default: 3000ms
 * @returns 		Promise<void>
 */
export default async <T extends keyof RouteNamedMap>(router: Router, name: T, params: RouteNamedMap[T]['params'] | string, message: string = '', timeout: number = 3000) => {
    try {        
		let path: RouteLocationRaw = {};
		
		// const { path, params } = replaceWithValues(path, params);
		// TODO: fix params
		if (params) {
			debugger;
			if (params instanceof Object)  {
				path.params = params;
			} else {
				const fixedParams = parseParams<T>(params);
				path.params = fixedParams;
			}
			// TODO: maybe figure out the typing for params?
		}
		
		// RouteLocationAsRelativeTyped<RouteMap extends RouteMapGeneric = RouteMapGeneric,
		// Name extends keyof RouteMap = keyof RouteMap>.params?

		path.name = name;
		await router.push(path);
		// TODO: check if message is empty
        useTost(message, timeout);
    } catch (error) {
		// TODO: Handle error
        console.log(error);
    }
}

function parseParams<TName extends keyof RouteNamedMap>(paramString: string): RouteLocationAsRelativeTyped<RouteMapGeneric, TName>['params'] {
	if (!paramString) {
	  return {};
	}

	// If there's no comma, just return a single key-value pair
	if (!paramString.includes(',')) {
		const [key, value] = paramString.split(':');
		return { [key]: value };										
	}

	// Split the input by commas for multiple key-value pairs
	const pairs = paramString.split(',');
  
	// Reduce into an object by splitting each pair by ":"
	return pairs.reduce((acc, pair) => {
	  const [key, value] = pair.split(':');
	  
	  if (key && value) {
		acc[key.trim()] = value.trim();
	  }
	  
	  return acc;
	}, {} as Record<string, string>);
}