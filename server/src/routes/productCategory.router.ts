import type { Router, RequestHandler } from 'express';

import { isAuthenticated } from '@/middlewares/auth.middleware';

import { deleteProductCategoryById, getAllProductCategories, getProductCategoriesByName, getProductCategoryById, registerProductCategory, updateProductCategoryById } from '@/controllers/productCategory.controller';
/**
 * Registers all the routes for the product category entity
 * @param {Router} ProductCategoryRouter - Main router for all routes
 * @param {RequestHandler[] | RequestHandler} [middlewares=[]] - Middlewares to be applied to all routes
 */
export default (productCategoryRouter: Router, middlewares: RequestHandler[] | RequestHandler = []) => {
	// Register the creation route
	registerCRUDRoutes(productCategoryRouter, middlewares);

};

function registerCRUDRoutes(productCategoryRouter: Router, middlewares: RequestHandler[] | RequestHandler = []) {
	productCategoryRouter.post('/product_category', middlewares, registerProductCategory);

	productCategoryRouter.get('/product_category', middlewares, getAllProductCategories);
	productCategoryRouter.get('/product_category/:id', middlewares, getProductCategoryById);
	productCategoryRouter.get('/product_category/name/:name', isAuthenticated, getProductCategoriesByName);
	
	// productCategoryRouter.get('/product_category/custom', middlewares, getProductCategoriesByCustomQuery);
	
	productCategoryRouter.patch('/product_category/:id', middlewares, updateProductCategoryById);
	
	productCategoryRouter.delete('/product_category/:id', middlewares, deleteProductCategoryById);
	// productCategoryRouter.delete('/product_category/user/:userId', middlewares, deleteUserProductCategoriesTransaction);
}