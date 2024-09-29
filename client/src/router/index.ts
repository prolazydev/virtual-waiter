import { createRouter, createWebHistory, type RouteParamsRawGeneric } from 'vue-router/auto'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'

// import HomeView from '@/views/HomeView.vue'
// import LoginView from '@/views/auth/LoginView.vue'
// import RegisterView from '@/views/auth/RegisterView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

if (import.meta.hot) {
    handleHotUpdate(router);
}

// TODO: change auth guard to check from 3 types of auth: need-auth, only-guest and none
router.beforeEach((to, {}, next) => {
	// const loader = useLoader();
	// loader.startLoader();

	const { isAuth, 
        // hasRole 
    } = useAuth();

    try {
        // TODO: handle auth and role

		if (to.meta.auth === 'both') {
			next();
		} else if (to.meta.auth === 'need-auth') {
			if (isAuth()) {
				next();
			} else {
				const listedParams = listParams(to.params);
				next({ name: 'login', query: { redirect: to.name, params: listedParams } });
			}
        } else if (to.meta.auth === 'only-guest') {
			if (isAuth()) {
				next({ name: 'home' });
			} else {
				next();
			}
		} else if (to.meta.auth === 'none') {
			next();
		}
		// else {
        //     next()
        // }
        // if (to.meta.auth && !isAuth()) {
        //     // if (to.meta.role && !hasRole(to.meta.role as string)) {
                
        //     // }
            
        //     next({ name: 'login', query: { redirect: to.fullPath } })
        // } else {
        //     next()
        // }
    } catch (error) {
        console.log(error);
        next({ name: 'bad-request' });
    }
});

router.afterEach(() => {
	// const loader = useLoader();
	// loader.finishLoader();
});

// #region Private

function listParams(params: RouteParamsRawGeneric) {
	let listedParams = '';
	const paramKeys = Object.keys(params);

	if (paramKeys.length === 0) {
		return listedParams;
	}
	for (let i = 0; i < paramKeys.length; i++) {
		const paramKey = paramKeys[i];
		if (i > 0) {
			listedParams += ',';
		}
		listedParams += `${paramKey}:${params[paramKey]}`;
	}

	return listedParams;
}

// #endregion

export default router;