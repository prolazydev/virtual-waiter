import type { ProductCategory } from '@/types/models/productCategory';

export default () => {
    const getProductCategoryById = async (id: string, fields: string[] = []) =>
        await myFetch<ProductCategory>(`product_category/${id}${setupFields(fields)}`);
    
    const getProductCategoryByName = async (name: string) =>
        await myFetch<ProductCategory>(`product_category/name/${name}`);

    const getAllProductCategories = async (fields: string[] = []) => 
        await myFetch<ProductCategory[]>(`product_category${setupFields(fields)}`);

    const updateProductCategory = async (id: string, category: Partial<ProductCategory>) => 
        await myFetch<ProductCategory>(
            `product_category/${id}`, 
            JSON.stringify(category), 
            { method: 'PATCH' }
        );

    return {
        getProductCategoryById,
        getProductCategoryByName,
        getAllProductCategories,
        updateProductCategory
    }
}

// #region Helpers
function setupFields(fields: string[]) {
    return fields.length > 0 ? `?fields=${fields.join(',')}` : '';
}
// #endregion Helpers