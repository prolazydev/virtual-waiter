import type { BusinessDashboardTab } from '@/types/models/business';

export const tabs: BusinessDashboardTab[] = [
	{ 
		name: 'home',
		icon: 'LayoutDashboard'
	},
	{
		name: 'business',
		icon: 'ChefHat'
	},
	{
		name: 'conversations',
		icon: 'MessageCircle',
	},
	{
		name: 'orders',
		icon: 'ShoppingCart'
	},
	{
		name: 'products',
		icon: 'Box'
	},
	{
		name: 'analytics',
		icon: 'ChartNoAxesCombined'
	},
	{
		name: 'reports',
		icon: 'FileText'
	},
	{
		name: 'settings',
		icon: 'Settings'
	},
];