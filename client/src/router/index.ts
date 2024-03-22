import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import { useUserStore } from '@/stores/user';


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
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/AboutView.vue')
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView,
			props: (route) => ({ redirect: route.query.redirect }),
		},
		{
			path: '/register',
			name: 'register',
			component: RegisterView
		},
		{
			path: '/confirm-account/:token',
			name: 'confirmAccount',
			component: () => import('@/views/auth/ConfirmAccountView.vue'),
			meta: {
				auth: true
			}
		},
		{
			path: '/search',
			name: 'searchDashboard',
			component: () => import('@/views/SearchDashboard.vue'),
			// props: (route) => (
			// { 
			// 	query: route.query.query, searchType: route.query.searchType 
			// }),
		}
		// TODO: Add 404 page
		// {
		// 	path: '/:pathMatch(.*)*',
		// 	name: 'not-found',
		// 	component: () => import('@/views/NotFoundView.vue')
		// }
	]
})

router.beforeEach((to, from, next) => {
	const userStore = useUserStore();	

	if (to.meta.auth && !userStore.user) {
		next({ name: 'login', query: { redirect: to.fullPath } })
	} else {
		next()
	}
});

router.afterEach(() => {
	// const toast = router.
	
});



export default router
