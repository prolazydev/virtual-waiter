import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('../views/AboutView.vue')
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView,
			props: route => ({ redirect: route.query.redirect }),
			beforeEnter: ({ }, { }, next) =>
				useAuth().isAuth() ? next({ name: 'home' }) : next()
		},
		{
			path: '/register',
			name: 'register',
			component: RegisterView,
			beforeEnter: (to, from, next) => {
				const { isAuth } = useAuth();

				if (isAuth()) 
					next({ name: 'home' });
				else
					next();
			}
		},
		{
			path: '/confirm_account/:token',
			name: 'confirmAccount',
			component: () => import('@/views/auth/ConfirmAccountView.vue'),
			meta: {
				auth: true
			},
		},
		{
			path: '/search',
			name: 'searchDashboard',
			component: () => import('@/views/SearchDashboard.vue'),
			// props: (route) => (
			// { 
			// 	query: route.query.query, searchType: route.query.searchType 
			// }),
		},
		{
			path: '/profile',
			name: 'authProfile',
			component: () => import('@/views/user/ProfileView.vue'),
			meta: {
				auth: true
			},
		},
		// {
		// 	path: '/profile/:username',
		// 	name: 'userProfile',
		// 	component: () => import('@/views/user/UserProfileView.vue'),
		// }
		{
			path: '/dashboard',
			name: 'dashboard',
			component: () => import('@/views/business/businessDashboard/BusinessDashboardView.vue'),
			meta: {
				auth: true
			},
		},
		{
			path: '/business/:id',
			name: 'businessProfile',
			component: () => import('@/views/business/businessProfile/BusinessProfileView.vue'),
			meta: {
				auth: true
			},
		},
		// TODO: Add edit business page
		// {
		// 	path: '/edit_business/:id',
		// 	name: 'editBusiness',
		// 	component: () => import('@/views/business/EditBusinessView.vue'),
		// },
		{
			path:'/create_business',
			name: 'createBusiness',
			component: () => import('@/views/business/BusinessCreateView.vue'),
			meta: {
				auth: true
			},
		},
		{
			path: '/business_confirmation/:id',
			name: 'businessConfirmation',
			component: () => import('@/views/business/BusinessConfirmationView.vue'),
			meta: {
				auth: true
			},
		},
		// TODO: Add 404 page
		{
			path: '/:pathMatch(.*)*',
			name: 'notFound',
			component: () => import('@/views/error/NotFoundView.vue')
		},
		{
			path: '/bad_request',
			name: 'badRequest',
			component: () => import('@/views/error/BadRequestView.vue')
		}
	]
})

router.beforeEach((to, from, next) => {
	const { isAuth } = useAuth();

	if (to.meta.auth && !isAuth()) {
		next({ name: 'login', query: { redirect: to.fullPath } })
	} else {
		next()
	}
});

// router.afterEach(() => {
// 	// const toast = router.
	
// });



export default router
