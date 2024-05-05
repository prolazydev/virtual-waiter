import type { Router, RequestHandler, Response, NextFunction } from 'express';

import { registerBusinessRequest, getAllBusinesses, getBusinessById, getBusinessesByUserId, getBusinessesByName, getBusinessesByCustomQuery, updateBusinessById, deleteUserBusinessesTransaction, getBusinessesSelf, confirmBusinessAccount, getBusinessConfirmationCode } from '../controllers/business.controller';
import { deleteBusinessById } from '../services/CRUD/business.service';
import { isAuthenticated, isSelfItemOwner } from '../middlewares/auth.middleware';
import type { MyRequest } from '../types';

export default (businessRouter: Router, middlewares: RequestHandler[] | RequestHandler = []) => {
	// Register business process
	businessRouter.post('/business', isAuthenticated, registerBusinessRequest);
	businessRouter.get('/business/confirm_account/:id', isAuthenticated, getBusinessConfirmationCode);
	businessRouter.patch('/business/confirm_account/:id/:code', isAuthenticated, confirmBusinessAccount);
	
	// GET
	businessRouter.get('/business', middlewares, getAllBusinesses);
	
	businessRouter.get('/business_self', isAuthenticated, getBusinessesSelf);
	businessRouter.get('/business_self/:id', isAuthenticated, (req: MyRequest, res: Response, next: NextFunction) => isSelfItemOwner(req, res, next, 'businesses'), getBusinessById);
	
	
	businessRouter.get('/business/:id', isAuthenticated, getBusinessById);
	businessRouter.get('/business/user/:userId', middlewares, getBusinessesByUserId);
	businessRouter.get('/business/name/:name', middlewares, getBusinessesByName);
	
	businessRouter.get('/business/custom', middlewares, getBusinessesByCustomQuery);

	// PATCH
	businessRouter.patch('/business/:id', middlewares, updateBusinessById);

	// DELETE
	businessRouter.delete('/business/:id', middlewares, deleteBusinessById);
	businessRouter.delete('/business/user/:userId', middlewares, deleteUserBusinessesTransaction);
};