import { useRouter, type RouteLocationRaw, type RouteRecordNormalized } from "vue-router";

/**
 * Composable for preloading route components
 * @returns Object with preloadRoute method
 */
export default () => {
	const router = useRouter();
	/**
     * Preloads components for a given route path
     * @param path - Route path to preload
     * @throws Error if router is not available
     */
    const preloadRoute = async (path: RouteLocationRaw): Promise<void> => {
		if (!router) {
            throw new Error('Router not initialized');
        }
		const route = router.resolve(path);
        if ( !route.matched.length ) return;

		const preloadComponent = async (component: any): Promise<void> => {
            if (typeof component === 'function') {
                try {
                    await component();
                } catch (error) {
                    console.error(`Failed to preload component: ${error}`);
                }
            }
        };

		const preloadRecord = async (record: RouteRecordNormalized): Promise<void> => {
            const components = record.components;
            if (!components) return;

            await Promise.all(
                Object.values(components).map(preloadComponent)
            );
        };

        await Promise.all(route.matched.map(preloadRecord));

        // // Preload components for the route
        // route.matched.forEach((record) => {
        //     const components = record.components;

        //     if (components) {
        //         Object.values(components).forEach((component) => {
        //             if (typeof component === "function") {
        //                 // @ts-expect-error stupid
        //                 component(); // Trigger dynamic import
        //             }
        //         });
        //     }
        // });
    };

    return {
        preloadRoute,
    };
};

// export default () => {
//     /** Preload a route by its path */
//     const preloadRoute = (path: RouteLocationRaw, router: Router): void => {
//         const route = router.resolve(path);

//         // Check if the route has matched records
//         if (route.matched && route.matched.length > 0) {
//             route.matched.forEach((record) => {
//                 if (record.components) {
//                     // Iterate over all components in the record
//                     for (const key in record.components) {
//                         const component = record.components[key];

//                         // If it's a dynamic import, preload it
//                         if (typeof component === 'function') {
//                             // @ts-expect-error stupid
//                             component();
//                         }
//                     }
//                 }
//             });
//         }
//     };

//     return {
//         preloadRoute,
//     }
// }