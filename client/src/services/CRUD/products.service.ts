import type { Product, ProductForm } from '@/types/models/product';

export default () => {
	// GET
    const getProductsByBusinessId = async (businessId: string) => 
        await myFetch<Product[]>(`products/business/${businessId}`);


	// POST
	const addProduct = async (product: ProductForm) =>
		await myFetch<ProductForm>('products', product, { method: 'POST' });

    return {
        getProductsByBusinessId,
		addProduct,
    }
}