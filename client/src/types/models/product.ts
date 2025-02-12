export type Product = {
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

export type ProductForm = {
	name: string;
	description: string;
	price: number;
	businessId: string;
	image: string;
	categoryId: string;
	categoryDisplayName: string;
    dietaryInformation: string[];
	availibility: string;
    availibilityDisplayName: string;
}