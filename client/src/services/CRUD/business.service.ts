import type { Business, BusinessEdit, BusinessQueryFieldKeys } from '@/types/models/business';

export default () => {
    const getBusinessById = async (id: string, fields: BusinessQueryFieldKeys[] = []) =>
        await myFetch<Business>(`business/${id}${setupFields(fields)}`);
    
    const getBusinessByName = async (name: string) =>
		await myFetch<Business>(`business/name/${name}`);

    const getAllOwnedBusinesses = async (fields: BusinessQueryFieldKeys[] = []) => 
		await myFetch<Business[]>(`business/owned${setupFields(fields)}`);

    const getOwnedBusinessById = async (id: string, fields: BusinessQueryFieldKeys[] = []) => 
        await myFetch<Business>(`business/owned/${id}${setupFields(fields)}`);

    const getBusinessDisplayNameById = async (id: string) => 
        await myFetch<{ _id: number, displayName: string }>(`business/${id}?fields=displayName`);

    const updateBusiness = async (id: string, business: Partial<BusinessEdit>) => 
        await myFetch<Business>(`business/${id}`, JSON.stringify(business), { method: 'PATCH' });

    return {
        getBusinessById,
        getBusinessByName,
        getAllOwnedBusinesses,
        getOwnedBusinessById,
        getBusinessDisplayNameById,
        updateBusiness
    }
}

// #region Helpers
function setupFields(fields: string[]) {
    return fields.length > 0 ? `?fields=${fields.join(',')}` : '';
}

// #endregion Helpers
