import type { LoggedInUser } from '@/types/auth/user';
import type { TabMap } from '@/types/models/business';

const emptyUser: LoggedInUser = {
	id: '',
	email: '',
	username: '',
	roles: '',
	isAuth: false,
	hasBusiness: false,
	avatar: '',
    lastBusinessDashboardTab: 'Home',
    lastBusinessSettingsTab: 'General',
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
		lastBusinessDashboardTab: 'Home',
		lastBusinessSettingsTab: 'General',
	});

	const setNewLoginUser = (newUser: LoggedInUser) => {
		user.value = newUser
		user.value.isAuth = true;
        
        user.value.lastBusinessDashboardTab = 'Home';
        user.value.lastBusinessSettingsTab = 'General';
	}

	// const setTab = (tabKey: 'lastBusinessDashboardTab' | 'lastBusinessSettingsTab', tab: BusinessDashboardTabTitles | BusinessSettingsTabTitles) => user!.value[tabKey] = tab as any;
	// NOTE: This is the same as the above function but with generics, enforcing the correct tab key and tab value
    function setTab<K extends keyof TabMap>(tabKey: K, tab: TabMap[K]) {
        user.value[tabKey] = tab as any;
    }

	const logoutUser = () => user.value = emptyUser

	return {
		user,
		setNewLoginUser,
		setTab,
		logoutUser,
	}
}, { persist: true });