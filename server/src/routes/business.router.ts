import type { Router, RequestHandler, Response, NextFunction } from 'express';

import type { MyRequest } from '@/types';

import { registerBusinessRequest, getAllBusinesses, getBusinessById, getBusinessesByUserId, getBusinessByName, getBusinessesByCustomQuery, updateBusiness, deleteUserBusinessesTransaction, getAllOwnedBusinesses, confirmBusinessAccount, getBusinessConfirmationCode, updateBusinessContact, addBusinessContact, deleteBusiness, deleteBusinessContact } from '@/controllers/business.controller';
import { isAuthenticated, isSelfItemOwner } from '@/middlewares/auth.middleware';

/**
 * Registers all the routes for the business entity
 * @param {Router} businessRouter - Main router for all routes
 * @param {RequestHandler[] | RequestHandler} [middlewares=[]] - Middlewares to be applied to all routes
 */
export default (businessRouter: Router, middlewares: RequestHandler[] | RequestHandler = []) => {
	registerBusinessCreationProcessRoutes(businessRouter);
	
	// GET
	registerGetRoutes(businessRouter, middlewares);

	// PATCH
	registerPatchRoutes(businessRouter, middlewares);

	// DELETE
	registerDeleteRoutes(businessRouter, middlewares);
};

function registerDeleteRoutes(businessRouter: Router, middlewares: RequestHandler[] | RequestHandler = []) {
	businessRouter.delete('business/:id/contact', middlewares, deleteBusinessContact);
	businessRouter.delete('/business/:id', middlewares, deleteBusiness);
	businessRouter.delete('/business/user/:userId', middlewares, deleteUserBusinessesTransaction);
}

function registerPatchRoutes(businessRouter: Router, middlewares: RequestHandler[] | RequestHandler = []) {
	businessRouter.patch('/business/add/:id/contact', middlewares, addBusinessContact);
	businessRouter.patch('/business/edit/:id/contact', isAuthenticated, updateBusinessContact);
	businessRouter.patch('/business/delete/:id/contact', middlewares, deleteBusinessContact);
	businessRouter.patch('/business/:id', updateBusiness);
}

function registerGetRoutes(businessRouter: Router, middlewares: RequestHandler[] | RequestHandler = []) {
	// TODO: Proper renaming
	businessRouter.get('/business/all', middlewares, getAllBusinesses);

	businessRouter.get('/business/owned', isAuthenticated, getAllOwnedBusinesses);
	businessRouter.get('/business/owned/:id', isAuthenticated, (req: MyRequest, res: Response, next: NextFunction) => isSelfItemOwner(req, res, next, 'businesses'), getBusinessById);

	businessRouter.get('/business/:id', isAuthenticated, getBusinessById);

	businessRouter.get('/business/name/:name', middlewares, getBusinessByName);
	businessRouter.get('/business/user/:userId', middlewares, getBusinessesByUserId);

	businessRouter.get('/business/custom', middlewares, getBusinessesByCustomQuery);
}

function registerBusinessCreationProcessRoutes(businessRouter: Router) {
	businessRouter.post('/business', isAuthenticated, registerBusinessRequest);
	// Get the Confirmation Code from the token
	businessRouter.get('/business/confirm_account/:id', isAuthenticated, getBusinessConfirmationCode);
	// Finalize the Registration
	businessRouter.patch('/business/confirm_account/:id/:code', isAuthenticated, confirmBusinessAccount);
}
