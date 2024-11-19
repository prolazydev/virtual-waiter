import type { Router, RequestHandler } from 'express';

import { isAuthenticated } from '@/middlewares/auth.middleware';
import { registerBusinessCategory, getAllBusinessCategories, getBusinessCategoryById, getBusinessCategoriesByName, getBusinessCategoriesByCustomQuery, updateBusinessCategoryById, deleteBusinessCategoryById, deleteUserBusinessCategoriesTransaction } from '@/controllers/businessCategory.controller';

export default (businessCategoryRouter: Router, middlewares: RequestHandler[] | RequestHandler = []) => {
	businessCategoryRouter.post('/business_category', middlewares, registerBusinessCategory);

	businessCategoryRouter.get('/business_category', middlewares, getAllBusinessCategories);
	businessCategoryRouter.get('/business_category/:id', middlewares, getBusinessCategoryById);
	businessCategoryRouter.get('/business_category/name/:name', isAuthenticated, getBusinessCategoriesByName);

	businessCategoryRouter.get('/business_category/custom', middlewares, getBusinessCategoriesByCustomQuery);

	businessCategoryRouter.patch('/business_category/:id', middlewares, updateBusinessCategoryById);

	businessCategoryRouter.delete('/business_category/:id', middlewares, deleteBusinessCategoryById);
	businessCategoryRouter.delete('/business_category/user/:userId', middlewares, deleteUserBusinessCategoriesTransaction);
};