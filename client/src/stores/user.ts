import type { LoggedInUser } from '@/types/auth/user';

const emptyUser: LoggedInUser = {
	id: '',
	email: '',
	username: '',
	roles: '',
	isAuth: false,
	avatar: ''
}

export const useUserStore = defineStore('user', () => {
	const user = ref<LoggedInUser>({
		id: '',
		email: '',
		username: '',
		roles: '',
		isAuth: false,
	});

	function setNewLoginUser(newUser: LoggedInUser) {
		user.value = newUser
		user.value.isAuth = true;
	}

	const logoutUser = () => user.value = emptyUser

	return {
		user,
		setNewLoginUser,
		logoutUser
	}

}, { persist: true });
