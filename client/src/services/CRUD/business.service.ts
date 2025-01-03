import type { Business, BusinessEdit, BusinessQueryFieldKeys } from '@/types/models/business';

export default () => {
    const getBusinessById = async (id: string, fields: BusinessQueryFieldKeys[] = []) =>
        await myFetch<Business>(`business/${id}${setupFields(fields)}`);
    
    const getBusinessByName = async (name: string) =>
		await myFetch<Business>(`business/name/${name}`);

    const getBusinessesSelf = async () => 
		await myFetch<Business[]>('business_self');

    const getBusinessSelfById = async (id: string, fields: BusinessQueryFieldKeys[] = []) => 
        await myFetch<Business>(`business_self/${id}${setupFields(fields)}`);

    const getBusinessDisplayNameById = async (id: string) => 
        await myFetch<{ _id: number, displayName: string }>(`business/${id}?fields=displayName`);

    const updateBusiness = async (id: string, business: Partial<BusinessEdit>) => 
        await myFetch<Business>(`business/${id}`, JSON.stringify(business), { method: 'PATCH' });

    return {
        getBusinessById,
        getBusinessByName,
        getBusinessesSelf,
        getBusinessSelfById,
        getBusinessDisplayNameById,
        updateBusiness
    }
}

// #region Helpers
function setupFields(fields: string[]) {
    return fields.length > 0 ? `?fields=${fields.join(',')}` : '';
}

// #endregion Helpers
