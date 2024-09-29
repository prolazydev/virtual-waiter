export default () => {
    const getProductsByBusinessId = async (businessId: string) => 
        await myFetch<Product[]>(`products/business/${businessId}`);

    return {
        getProductsByBusinessId,
    }
}

type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    businessId: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}