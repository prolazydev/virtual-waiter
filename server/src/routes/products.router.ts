import type { RequestHandler, Router } from 'express';
import { addProduct, getAllProductsByBusinessId } from '@/controllers/product.controller';

/**
 * 
 */
export default (productRouter: Router, middlewares: RequestHandler | RequestHandler[] = []) => {
	productRouter.get('/products/business/:businessId', middlewares, getAllProductsByBusinessId);

	productRouter.post('/products', middlewares, addProduct);
};