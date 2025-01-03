import type { BusinessDashboardTab } from '@/types/models/business';

export const tabs: BusinessDashboardTab[] = [
	{ 
		name: 'Home',
		icon: 'LayoutDashboard'
	},
	{
		name: 'Business',
		icon: 'ChefHat'
	},
	{
		name: 'Conversations',
		icon: 'MessageCircle',
	},
	{
		name: 'Orders',
		icon: 'ShoppingCart'
	},
	{
		name: 'Products',
		icon: 'Box'
	},
	{
		name: 'Analytics',
		icon: 'ChartNoAxesCombined'
	},
	{
		name: 'Reports',
		icon: 'FileText'
	},
	{
		name: 'Settings',
		icon: 'Settings'
	},
];