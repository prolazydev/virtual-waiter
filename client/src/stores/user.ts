import type { LoggedInUser } from '@/types/auth/user';
import type { BusinessDashboardTabTitles } from '@/types/business';

const emptyUser: LoggedInUser = {
	id: '',
	email: '',
	username: '',
	roles: '',
	isAuth: false,
	hasBusiness: false,
	avatar: ''
}


type Test = keyof LoggedInUser;

const myTest: Test = 'lastBusinessDashboardTab'

export default 
defineStore('user', () => {
	const user = ref<LoggedInUser>({
		id: '',
		email: '',
		username: '',
		roles: '',
		hasBusiness: false,
		isAuth: false,
		lastBusinessDashboardTab: 'Home',
		lastBusinessSettingsTab: 'General',
	});

	const setNewLoginUser = (newUser: LoggedInUser) => {
		user.value = newUser
		user.value.isAuth = true;
	}

	const setTab = (tabKey: 'lastBusinessDashboardTab' | 'lastBusinessSettingsTab', tab: BusinessDashboardTabTitles) => user!.value[tabKey] = tab as any;

	const logoutUser = () => user.value = emptyUser

	return {
		user,
		setNewLoginUser,
		setTab,
		logoutUser,
	}
}, { persist: true });