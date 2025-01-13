import usePerformanceMetrics from '@/composables/usePerformanceMetrics';
import { createRouter, createWebHistory } from 'vue-router/auto';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

if (import.meta.hot) {
	handleHotUpdate(router);
}

const { start, end, timeToLoad } = usePerformanceMetrics();
router.beforeEach((to, { }, next) => {
	start();
	
	const { isAuth,
		// hasRole 
	} = useAuth();

	try {
		// TODO: handle auth and role
		if (to.meta.auth && !isAuth()) {
			// if (to.meta.role && !hasRole(to.meta.role as string)) {

			// }
			next({ name: 'login', query: { redirect: to.fullPath } });
		} else {
			next();
		}
		window.scrollTo(0, 0)
	} catch (error) {
		// TODO: Handle Routing error
		console.error(error);
		next({ name: '/error/bad-request' });
	} finally {

	}
});

router.afterEach(() => {
	end();
	console.log(timeToLoad.value);
});

// router.afterEach(() => {
	// const loader = useLoader();
	// loader.finishLoader();
// });

export default router;