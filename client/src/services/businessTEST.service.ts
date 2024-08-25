import type { Business, BusinessEdit } from '@/types/models/business';

export default () => {
	const getBusinessByName = async (name: string) =>
		await myFetch<Business>(`business/name/${name}`);

	const getBusinessesSelf = async () => 
		await myFetch<Business[]>('business_self');
	
	const getBusinessSelfById = async (id: string) =>
		await myFetch<Business>(`business_self/${id}`);

	const updateBusiness = async (id: string, business: Partial<BusinessEdit>) => 
        await myFetch<Business>(`business/${id}`, JSON.stringify(business), { method: 'PATCH' });
    
	return {
		getBusinessByName,
		getBusinessesSelf,
		getBusinessSelfById,
		updateBusiness,
	}
}