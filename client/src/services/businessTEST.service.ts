import type { Business, BusinessEdit } from '@/types/models/business';

export default () => {
	const getBusinessByName = async (name: string) =>
		await myFetch<Business>(`business/name/${name}`);

	const getAllOwnedBusinesses = async () => 
		await myFetch<Business[]>('business_self');
	
	const getOwnedBusinessById = async (id: string) =>
		await myFetch<Business>(`business_self/${id}`);

	const updateBusiness = async (id: string, business: Partial<BusinessEdit>) => 
        await myFetch<Business>(`business/${id}`, JSON.stringify(business), { method: 'PATCH' });
    
	return {
		getBusinessByName,
		getAllOwnedBusinesses,
		getOwnedBusinessById,
		updateBusiness,
	}
}