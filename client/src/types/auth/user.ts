import type { BusinessDashboardTabTitles, BusinessSettingsTabTitles } from '../business';

export type LoggedInUser = {
    /**
     * The user's ID
     */
	id: string;
	email: string;
	username: string;
	roles: string[] | string;
	isAuth: boolean;
	hasBusiness: boolean;
	avatar?: string;

	lastBusinessDashboardTab?: BusinessDashboardTabTitles;
	lastBusinessSettingsTab?: BusinessSettingsTabTitles;
};

// export type LoginModel<TType extends 'email' | 'username'> = {
// password: string;
// } & (TType extends 'email' ? { email: string } : { username: string }); 

type EmailLogin = {
	loginType: 'email';
	email: string;
	password: string;
	rememberMe: boolean;
};

type UsernameLogin = {
	loginType: 'username';
	username: string;
	password: string;
	rememberMe: boolean;
};
type InvalidLogin = {
	loginType: 'invalid';
	password: string;
	rememberMe: boolean;
};

export type LoginModel = EmailLogin | UsernameLogin | InvalidLogin;


