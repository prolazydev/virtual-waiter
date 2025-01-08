import type { NavigationGuardNext } from 'vue-router';

/**
 * Auth Guard
 * @param next 
 */
export const needAuthGuard = (next: NavigationGuardNext) => {
	// TODO: Need to show toast or something to the user to notify them that they are not authorised
	if (useAuth().isAuth())
		next()
	else 
		next({ name: '/' })
}

/**
 * Needs to be a guest (Not logged in)
 * @param next 
 */
export const onlyGuestGuard = (next: NavigationGuardNext) => {
	if (useAuth().isAuth())
    	next({ name: '/' })
	else
		next()
}