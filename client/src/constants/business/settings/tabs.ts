import type { BusinessSettingsTab } from '@/types/models/business';

export const businessSettingsTabs: BusinessSettingsTab[] = [
    {
        name: 'General',
        icon: 'Settings'
    },
    {
        name: 'Access & Roles',
        icon: 'Lock'
    },
    {
        name: 'Notifications',
        icon: 'Bell'
    },
] as const;