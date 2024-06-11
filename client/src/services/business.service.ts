import type { Business } from '@/types/business';

export default () => {
	const getBusinessesSelf = async () => 
		await myFetch<Business[]>('business_self');
	
	const getBusinessSelfById = async (id: string) =>
		await myFetch<Business>(`business_self/${id}`);

	return {
		getBusinessesSelf,
		getBusinessSelfById,
	}
}