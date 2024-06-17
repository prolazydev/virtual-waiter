import type { Business } from '@/types/business';

export default () => {
	const getBusinessByName = async (name: string) =>
		await myFetch<Business>(`business/name/${name}`);

	const getBusinessesSelf = async () => 
		await myFetch<Business[]>('business_self');
	
	const getBusinessSelfById = async (id: string) =>
		await myFetch<Business>(`business_self/${id}`);
	

	return {
		getBusinessByName,
		getBusinessesSelf,
		getBusinessSelfById,
	}
}