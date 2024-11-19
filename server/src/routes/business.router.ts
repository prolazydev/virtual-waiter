import type { Router, RequestHandler, Response, NextFunction } from 'express';

import type { MyRequest } from '@/types';

import { registerBusinessRequest, getAllBusinesses, getBusinessById, getBusinessesByUserId, getBusinessByName, getBusinessesByCustomQuery, updateBusiness, deleteUserBusinessesTransaction, getBusinessesSelf, confirmBusinessAccount, getBusinessConfirmationCode, updateBusinessContact, addBusinessContact, deleteBusiness, deleteBusinessContact } from '@/controllers/business.controller';
import { isAuthenticated, isSelfItemOwner } from '@/middlewares/auth.middleware';

export default (businessRouter: Router, middlewares: RequestHandler[] | RequestHandler = []) => {
	// Register business process
	businessRouter.get('/business/confirm_account/:id', isAuthenticated, getBusinessConfirmationCode);
	
	businessRouter.post('/business', isAuthenticated, registerBusinessRequest);
	
	businessRouter.patch('/business/confirm_account/:id/:code', isAuthenticated, confirmBusinessAccount);
	
	// TODO: Proper renaming
	businessRouter.get('/business', middlewares, getAllBusinesses);
	
	businessRouter.get('/business_self', isAuthenticated, getBusinessesSelf);
	businessRouter.get('/business_self/:id', isAuthenticated, (req: MyRequest, res: Response, next: NextFunction) => isSelfItemOwner(req, res, next, 'businesses'), getBusinessById);
	
	businessRouter.get('/business/:id', isAuthenticated, getBusinessById);

	businessRouter.get('/business/name/:name', middlewares, getBusinessByName);
	businessRouter.get('/business/user/:userId', middlewares, getBusinessesByUserId);
	
	businessRouter.get('/business/custom', middlewares, getBusinessesByCustomQuery);

	// PATCH
	businessRouter.patch('/business/add/:id/contact', middlewares, addBusinessContact);
	businessRouter.patch('/business/edit/:id/contact', isAuthenticated, updateBusinessContact);
	businessRouter.patch('/business/delete/:id/contact', middlewares, deleteBusinessContact);
	businessRouter.patch('/business/:id',  updateBusiness);

	// DELETE
	businessRouter.delete('business/:id/contact', middlewares, deleteBusinessContact);
	businessRouter.delete('/business/:id', middlewares, deleteBusiness);
	businessRouter.delete('/business/user/:userId', middlewares, deleteUserBusinessesTransaction);
};