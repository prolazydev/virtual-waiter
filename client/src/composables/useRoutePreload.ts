import type { RouteLocationRaw, Router,  } from "vue-router";

export default () => {
    /** Preload a route by its path */
    const preloadRoute = (path: RouteLocationRaw, router: Router): void => {
        const route = router.resolve(path);

        // Ensure the route is valid and has matched records
        if (!route.matched.length) return;

        // Preload components for the route
        route.matched.forEach((record) => {
            const components = record.components;

            if (components) {
                Object.values(components).forEach((component) => {
                    if (typeof component === "function") {
                        // @ts-expect-error stupid
                        component(); // Trigger dynamic import
                    }
                });
            }
        });
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