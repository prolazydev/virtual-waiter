import type { BusinessSettingsTab } from '@/types/models/business';

export const tabs: BusinessSettingsTab[] = [
	{
		name: 'General',
		icon: 'Settings'
	},
	{
		name: 'Access',
		icon: 'Lock'
	},
	{
		name: 'Notifications',
		icon: 'Bell'
	},
];