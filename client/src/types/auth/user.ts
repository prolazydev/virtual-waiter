export type LoggedInUser = {
	id: string;
	email: string;
	username: string;
	roles: string[] | string;
	isAuth: boolean;
	avatar?: string;
};

// export type LoginModel<TType extends 'email' | 'username'> = {
// password: string;
// } & (TType extends 'email' ? { email: string } : { username: string }); 

type EmailLogin = {
	loginType: 'email';
	email: string;
	password: string;
};

type UsernameLogin = {
	loginType: 'username';
	username: string;
	password: string;
};
type InvalidLogin = {
	loginType: 'invalid';
	password: string;
};

export type LoginModel = EmailLogin | UsernameLogin | InvalidLogin;


