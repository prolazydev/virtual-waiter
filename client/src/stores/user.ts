import type { LoggedInUser } from '@/types/auth/user';

const emptyUser: LoggedInUser = {
	id: '',
	email: '',
	username: '',
	roles: '',
	isAuth: false,
	hasBusiness: false,
	avatar: ''
}

export default 
defineStore('user', () => {
	const user = ref<LoggedInUser>({
		id: '',
		email: '',
		username: '',
		roles: '',
		hasBusiness: false,
		isAuth: false,
		lastTab: '',
	});

	const setNewLoginUser = (newUser: LoggedInUser) => {
		user.value = newUser
		user.value.isAuth = true;
	}

	const setTab = (tab: string) => user.value.lastTab = tab;

	const logoutUser = () => user.value = emptyUser

	return {
		user,
		setNewLoginUser,
		setTab,
		logoutUser,
	}
}, { persist: true });