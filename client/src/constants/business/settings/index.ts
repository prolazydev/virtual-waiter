import type { BusinessFormFields } from '@/types/models/business';

export const placeholderPageSettings: BusinessFormFields = {
    username: {
        state: 'idle',
    },
    displayName: {
        state: 'idle',
        value: '',
    },
    email: {
        state: 'idle',
        value: '',
    },
    phone: {
        state: 'idle',
        value: '',
    },
    streetAddress: {
        state: 'idle',
        value: {
            primary: {
                main: '',
                zipCode: '',
            },
            secondary: {
                main: '',
                zipCode: '',
            },
        },
    },
    description: {
        state: 'idle',
        value: '',
    },
    location: {
        state: 'idle',
        value: '',
    },
    country: {
        state: 'idle',
        value: '',
    },
    profileImage: {
        state: 'idle',
        value: undefined,
    },
    coverImage: {
        state: 'idle',
    },
    hours: {
        state: 'idle',
        value: {
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: '',
        },
    },
    is24: {
        state: 'idle',
    },
    attributes: {
        state: 'idle',
        value: [],
    },
    categories: {
        state: 'idle',
        value: [],
    },
    website: {
        state: 'idle',
        value: '',
    },
    takesReservations: {
        state: 'idle',
    },
    delivery: {
        state: 'idle',
    },
    takeout: {
        state: 'idle',
    },
}