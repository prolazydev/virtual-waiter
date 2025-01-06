import type { Product } from '@/types/models/product';

export default () => {
    const getProductsByBusinessId = async (businessId: string) => 
        await myFetch<Product[]>(`products/business/${businessId}`);

    return {
        getProductsByBusinessId,
    }
}