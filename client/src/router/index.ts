import { createRouter, createWebHistory } from 'vue-router/auto';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

if (import.meta.hot) {
	handleHotUpdate(router);
}

router.beforeEach((to, { }, next) => {
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
	}
});

router.afterEach(() => {
	// const loader = useLoader();
	// loader.finishLoader();
});

export default router;