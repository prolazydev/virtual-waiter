export const defaultFormData = (id: string, email?: string) => {
	return {
		userId: id,
		name: '',
		email: '',
		userEmail: email ?? '',
		phone: '',
		description: '',
		is24: false,
		hours: {
			monday: '',
			tuesday: '',
			wednesday: '',
			thursday: '',
			friday: '',
			saturday: '',
			sunday: '',
		},
		categories: [''],
		country: '',
		streetAddress: {
			primary: {
				main: '',
				zipCode: '',
			},
			secondary: {
				main: '',
				zipCode: '',
			}
		},
		location: {
			name: '',
			city: '',
			state: '',
			zipCode: '',
			id: ''
		},
	}
};

// {
// 	userId: user.id,
// 	name: '',
// 	email: '',
// 	userEmail: user.email ?? '',
// 	phone: '',
// 	description: '',
// 	is24: false,
// 	hours: {
// 		monday: '',
// 		tuesday: '',
// 		wednesday: '',
// 		thursday: '',
// 		friday: '',
// 		saturday: '',
// 		sunday: '',
// 	},
// 	categories: [ '' ],
// 	country: '',
// 	streetAddress: {
// 		primary: {
// 			main: '',
// 			zipCode: '',
// 		},
// 		secondary: {
// 			main: '',
// 			zipCode: '',
// 		}
// 	},
// 	location: {
// 		name: '',
// 		city: '',
// 		state: '',
// 		zipCode: '',
// 		id: ''
// 	},
// }