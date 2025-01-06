import type { BusinessSettingsTab } from '@/types/models/business';

export const businessSettingsTabs: BusinessSettingsTab[] = [
    {
        name: 'General',
        icon: 'Settings'
    },
	// {
	// 	name: 'Products',
	// 	icon: 'Box'
	// },
    {
        name: 'Access & Roles',
        icon: 'Lock'
    },
	{
		name: 'Analytics',
		icon: 'ChartNoAxesCombined'
	},
    {
        name: 'Notifications',
        icon: 'Bell'
    },
] as const;