import type { BusinessFormFieldKeys, KeyHours, StreetAddresses } from '@/types/models/business';

type FieldType = 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'image' | 'date' | 'time' | 'datetime';
type StreetAddressKeys = keyof NonNullable<StreetAddresses['primary']>;

type PropType = BusinessFormFieldKeys | keyof StreetAddresses | StreetAddressKeys | KeyHours;

export interface Field {
    id: string;
    label: string;
    placeholder?: string;
    fieldType: 'field';
    prop: PropType;
    type: FieldType;
}

export interface NestedField {
    id: string;
    label: string;
    fieldType: 'nested';
    size?: "lg" | "sm" | "md" | "full" | "custom";
    customX?: string,
    customY?: string,
    prop?: PropType;
    fields: Field[] | NestedField[]; // Handle both nested fields and simple text or other types
}

export interface NestedSection {
    id: string;
    name: string;
    label: string;
    fieldType: 'nested-section';
    fields: FormField[];
    match?: boolean;
}

export type FormField = Field | NestedField | NestedSection;

export interface Section {
    id: string;
    name: string;
    fields: FormField[];
    match?: boolean;
}

export const sections: Section[] = [
    {
        id: 'basicInformation',
        name: 'Basic Information',
        fields: [
            { 
                id: 'username',
                label: 'Username',
                placeholder: 'MaNemaJeff',
                fieldType: 'field',
                prop: 'username',
                type: 'text' 
            },
            { 
                id: 'displayName',
                label: 'Display Name',
                placeholder: 'MaNemaJeff',
                fieldType: 'field',
                prop: 'displayName',
                type: 'text' 
            },
            {
                id: 'description',
                label: 'Description',
                placeholder: 'Description',
                fieldType: 'field',
                prop: 'description',
                type: 'textarea'
            },
            {
                id: 'address',
                label: 'Address',
                fieldType: 'nested',
                size: 'custom',
                prop: 'streetAddress',
                fields: [
                    // TODO: figure out the accessing on nested fields
                    {
                        id: 'main-address',
                        label: 'Primary Street Address',
                        fieldType: 'nested',
                        prop: 'primary',
                        fields: [
                            {
                                id: 'primary-street-address',
                                label: 'Primary Address',
                                fieldType: 'field',
                                prop: 'main',
                                type: 'text',
                                placeholder: '1234 Main St',
                            },
                            {
                                id: 'primary-zip-code',
                                label: 'Zip Code',
                                fieldType: 'field',
                                prop: 'zipCode',
                                type: 'text',
                                placeholder: '69420',
                            },
                        ]
                    },
                    {
                        id: 'secondary-address',
                        label: 'Secondary Street Address',
                        fieldType: 'nested',
                        prop: 'secondary',
                        fields: [
                            {
                                id: 'secondary-street-address',
                                label: 'Secondary Address',
                                fieldType: 'field',
                                prop: 'main',
                                type: 'text',
                                placeholder: '1234 Main St',
                            },
                            {
                                id: 'secondary-zip-code',
                                label: 'Zip Code',
                                fieldType: 'field',
                                prop: 'zipCode',
                                type: 'text',
                                placeholder: '69420',
                            },
                        ]
                    },
                ],
            }
        ],
    },
    {
        id: 'contactAndLocationInformation',
        name: 'Contact & Location Information',
        fields: [
            {
                id: 'phone',
                label: 'Phone',
                fieldType: 'field',
                prop: 'phone',
                type: 'text',
                placeholder: '123-456-7890',
            },
            {
                id: 'email',
                label: 'Email',
                fieldType: 'field',
                prop: 'email',
                type: 'text',
                placeholder: 'White House, Washington DC',
            },
            {
                id: 'location',
                label: 'Location',
                fieldType: 'field',
                prop: 'location',
                type: 'text',
                placeholder: 'White House, Washington DC',
            },
            {
                id: 'country',
                label: 'Country',
                fieldType: 'field',
                prop: 'country',
                type: 'text',
                placeholder: 'USA',
            },
            {
                id: 'categoriesAndHours',
                name: 'Categories & Hours',
                fieldType: 'nested-section',
                label: 'Categories & Hours',
                fields: [
                    {
                        id: 'categories',
                        label: 'Categories',
                        fieldType: 'nested',
                        size: 'custom',
                        prop: 'categories',
                        fields: [
                            {
                                id: 'category',
                                label: 'Category',
                                fieldType: 'field',
                                prop: 'categories',
                                type: 'text',
                                placeholder: 'Restaurant, Bar, Cafe',
                            }
                        ]
                    },
                    {
                        id: 'hours',
                        label: 'Hours',
                        fieldType: 'nested',
                        prop: 'hours',
                        fields: [
                            {
                                id: 'monday',
                                label: 'Monday',
                                fieldType: 'field',
                                prop: 'monday',
                                type: 'text',
                                placeholder: '09:00-17:00',
                            },
                            {
                                id: 'tuesday',
                                label: 'Tuesday',
                                fieldType: 'field',
                                prop: 'tuesday',
                                type: 'text',
                                placeholder: '09:00-17:00',
                            },
                            {
                                id: 'wednesday',
                                label: 'Wednesday',
                                fieldType: 'field',
                                prop: 'wednesday',
                                type: 'text',
                                placeholder: '09:00-17:00',
                            },
                            {
                                id: 'thursday',
                                label: 'Thursday',
                                fieldType: 'field',
                                prop: 'thursday',
                                type: 'text',
                                placeholder: '09:00-17:00',
                            },
                            {
                                id: 'friday',
                                label: 'Friday',
                                fieldType: 'field',
                                prop: 'friday',
                                type: 'text',
                                placeholder: '09:00-17:00',
                            },
                            {
                                id: 'saturday',
                                label: 'Saturday',
                                fieldType: 'field',
                                prop: 'saturday',
                                type: 'text',
                                placeholder: '09:00-17:00',
                            },
                            {
                                id: 'sunday',
                                label: 'Sunday',
                                fieldType: 'field',
                                prop: 'sunday',
                                type: 'text',
                                placeholder: '09:00-17:00',
                            },
                        ]
                    }
                ]

            }
        ]
    },
    {
        id: 'mediaInformation',
        name: 'Media Information',
        fields: [
            {
                id: 'logo',
                label: 'Profile Image',
                placeholder: 'Upload Logo',
                fieldType: 'field',
                prop: 'profileImage',
                type: 'file',
            },
            {
                id: 'coverImage',
                label: 'Cover Image',
                placeholder: 'Upload Cover Image',
                fieldType: 'field',
                prop: 'coverImage',
                type: 'file',
            },
        ]
    }
];