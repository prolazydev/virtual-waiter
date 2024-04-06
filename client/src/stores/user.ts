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
		});
	
		const setNewLoginUser = (newUser: LoggedInUser) => {
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