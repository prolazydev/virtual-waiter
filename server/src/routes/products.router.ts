import type { RequestHandler, Router } from 'express';
import { getAllProductsByBusinessId } from '@/controllers/product.controller';

/**
 * 
 */
export default (productRouter: Router, middlewares: RequestHandler | RequestHandler[] = []) => {
	productRouter.get('/products/business/:businessId', middlewares, getAllProductsByBusinessId);
};