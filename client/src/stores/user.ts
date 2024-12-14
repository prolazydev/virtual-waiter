import type { LoggedInUser } from '@/types/auth/user';
import type { TabMap } from '@/types/models/business';

const emptyUser: LoggedInUser = {
	id: '',
	email: '',
	username: '',
	roles: '',
	isAuth: false,
	hasBusiness: false, // TODO: Change property name to isBusinessOwner
	avatar: '',
    lastBusinessDashboardTab: 'Home',
    lastBusinessSettingsTab: 'General',
	isAuthLoading: false,
}

export default 
defineStore('user', () => {
	const user = ref<LoggedInUser>({ ...emptyUser });

	const setNewLoginUser = (newUser: LoggedInUser) => {
        user.value.id = newUser.id;
        user.value.email = newUser.email;
        user.value.username = newUser.username;
        user.value.roles = newUser.roles;
        user.value.hasBusiness = newUser.hasBusiness;
        // user.value.avatar = newUser.avatar;

		user.value.isAuth = true;
        user.value.lastBusinessDashboardTab = 'Home';
        user.value.lastBusinessSettingsTab = 'General';
		user.value.isAuthLoading = false;
	}

	// const setTab = (tabKey: 'lastBusinessDashboardTab' | 'lastBusinessSettingsTab', tab: BusinessDashboardTabTitles | BusinessSettingsTabTitles) => user!.value[tabKey] = tab as any;
	// NOTE: This is the same as the above function but with generics, enforcing the correct tab key and tab value
    function setTab<K extends keyof TabMap>(tabKey: K, tab: TabMap[K]) {
        user.value[tabKey] = tab as any;
    }

	const logoutUser = () => user.value = { ...emptyUser }

	return {
		user,
		setNewLoginUser,
		setTab,
		logoutUser,
	}
}, { persist: true });