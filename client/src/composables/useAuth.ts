import { useUserStore } from '@/stores/user';
import type { LoggedInUser } from '@/types/auth/user';
import { myFetch } from '@/utils/http';

export const useAuth = () => {
	const userStore = useUserStore();

	const isAuth = () => userStore.user.isAuth;

	/**
	 * Login
	 * @param newUser - LoggedInUser
	 * @returns 
	 */
	const login = (newUser: LoggedInUser) =>
		userStore.setNewLoginUser(newUser);

	const logout = async () => {
		userStore.logoutUser();
		console.log(userStore.user);
		await myFetch('auth/logout', '', { method: 'POST' });
	}

	return {
		isAuth,
		login,
		logout,
	}
}