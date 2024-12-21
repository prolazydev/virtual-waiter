import type { LoggedInUser } from '@/types/auth/user';
import type { Ref } from 'vue';

export default () => {
	const userStore = useUserStore();

	/**
	 * Returns authentication state
	 */
	const isAuth = () => userStore.user.isAuth;

	const checkAuth = async () => {
		userStore.user.isAuthLoading = true;
		try {
			const { response, data } = await myFetch<LoggedInUser>('auth/check');

            response.value?.ok ?
                userStore.setNewLoginUser(data.value!) :
                userStore.logoutUser();
                
			return;
		} catch (error) {
			console.log(error);
            if (isAuth())
			    userStore.logoutUser();
		} finally {
			userStore.user.isAuthLoading = false;
		}
	}

	const hasRole = (roles: string[] | string) => {
		if (!Array.isArray(roles))
			return userStore.user.roles.includes(roles);
		else
			return roles.some(role => userStore.user.roles.includes(role));
	}

	/**
	 * Login new user
	 * @param newUser - LoggedInUser
	 * @returns 
	 */
	const login = (newUser: LoggedInUser) =>
		userStore.setNewLoginUser(newUser);

	/**
	 * Empties the user store and logs out the user
	 */
	const logout = async (authUser: Ref<LoggedInUser>) => {
		try {
			authUser.value.isAuthLoading = true;
			await myFetch('auth/logout', '', { method: 'POST' });
		} catch (error) {
			console.log(error);
		} finally {
			userStore.logoutUser();
		}
	}

	return {
		isAuth,
		checkAuth,
		hasRole,
		login,
		logout,
	}
}