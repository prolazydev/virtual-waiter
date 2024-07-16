import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'

// import HomeView from '@/views/HomeView.vue'
// import LoginView from '@/views/auth/LoginView.vue'
// import RegisterView from '@/views/auth/RegisterView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
	// routes: [
	// 	{
	// 		path: '/',
	// 		name: 'home',
	// 		component: HomeView
	// 	},
	// 	{
	// 		path: '/about',
	// 		name: 'about',
	// 		component: () => import('../views/AboutView.vue')
	// 	},
	// 	{
	// 		path: '/login',
	// 		name: 'login',
	// 		component: LoginView,
	// 		props: route => ({ redirect: route.query.redirect }),
	// 		beforeEnter: ({}, {}, next) =>
	// 			useAuth().isAuth()
	// 				? next({ name: 'home' })
	// 				: next()
	// 	},
	// 	{
	// 		path: '/register',
	// 		name: 'register',
	// 		component: RegisterView,
	// 		beforeEnter: ({},{}, next) => 
	// 			useAuth().isAuth()
	// 				? next({ name: 'home' })
	// 				: next()
	// 	},
	// 	{
	// 		path: '/confirm_account/:token',
	// 		name: 'confirmAccount',
	// 		component: () => import('@/views/auth/ConfirmAccountView.vue'),
	// 		meta: {
	// 			auth: true
	// 		},
	// 	},
	// 	{
	// 		path: '/search',
	// 		name: 'search',
	// 		component: () => import('@/views/SearchView.vue'),
	// 		// props: (route) => (
	// 		// { 
	// 		// 	query: route.query.query, searchType: route.query.searchType 
	// 		// }),
	// 	},
	// 	{
	// 		path: '/user/:username',
	// 		name: 'userProfile',
	// 		component: () => import('@/views/user/ProfileView.vue'),
	// 		meta: {
	// 			auth: true
	// 		},
	// 	},
	// 	// {
	// 	// 	path: '/profile/:username',
	// 	// 	name: 'userProfile',
	// 	// 	component: () => import('@/views/user/UserProfileView.vue'),
	// 	// }
	// 	{
	// 		path:'/business/create',
	// 		name: 'createBusiness',
	// 		component: () => import('@/views/business/BusinessCreateView.vue'),
	// 		meta: {
	// 			auth: true
	// 		},
	// 	},
	// 	{
	// 		path: '/business_confirmation/:id',
	// 		name: 'businessConfirmation',
	// 		component: () => import('@/views/business/BusinessConfirmationView.vue'),
	// 		meta: {
	// 			auth: true
	// 		},
	// 	},
	// 	{
	// 		path: '/business/dashboard',
	// 		name: 'businessDashboard',
	// 		component: () => import('@/views/business/BusinessDashboardView.vue'),
	// 		meta: {
	// 			auth: true,
	// 			roles: [ 'business' ]
	// 		},
	// 	},
	// 	{
	// 		path: '/business/:id',
	// 		name: 'businessProfile',
	// 		component: () => import('@/views/business/BusinessProfileView.vue'),
	// 		meta: {
	// 			auth: true
	// 		},
	// 	},
	// 	// TODO: Add edit business page
	// 	{
	// 		path: '/business/settings/:id',
	// 		name: 'businessSettings',
	// 		component: () => import('@/views/business/BusinessSettingsView.vue'),
	// 		meta: {
	// 			auth: true
	// 		},
	// 	},
	// 	// TODO: Add 404 page
	// 	{
	// 		path: '/:pathMatch(.*)*',
	// 		name: 'notFound',
	// 		component: () => import('@/views/error/NotFoundView.vue')
	// 	},
	// 	{
	// 		path: '/bad_request',
	// 		name: 'badRequest',
	// 		component: () => import('@/views/error/BadRequestView.vue')
	// 	}
	// ]
})

if (import.meta.hot) {
    handleHotUpdate(router);
}

router.beforeEach((to, {}, next) => {
	const loader = useLoader();
	loader.startLoader();

	const { isAuth, hasRole } = useAuth();

    // TODO: handle auth and role
	if (to.meta.auth && !isAuth()) {
		if (to.meta.role && !hasRole(to.meta.role as string)) {
			
		}
		next({ name: '/auth/login', query: { redirect: to.fullPath } })
	} else {
		next()
	}
});

router.afterEach(() => {
	const loader = useLoader();
	loader.finishLoader();
});


export default router;