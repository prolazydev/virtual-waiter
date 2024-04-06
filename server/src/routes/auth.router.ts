import { Router } from 'express';
import { middlewareRequest } from '../types';
import { updatePassword, addRole, login, register, testAuth, resetPasswordRequest, resetPassword, removeRole, isUsernameTaken, verifyAccount, loginWithUsername, logout, checkAuth } from '../controllers/auth.controller';
import { deleteSelf, deleteUser } from '../controllers/user.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';

/**
 * Registers all the routes and middlewares for the respective routes
 * @param {Router} authRouter - Main router for all routes
 */
export default (authRouter: Router, middlewares: middlewareRequest = []) => {
	// Auth Test
	authRouter.all('/auth/test/:testParam', testAuth);
	authRouter.all('/auth/test', testAuth);

	// Auth Process
	authRouter.post('/auth/register', register);
	authRouter.post('/auth/login', login);
	authRouter.post('/auth/login_with_username', loginWithUsername);
	authRouter.post('/auth/logout', isAuthenticated, logout);
	
	authRouter.get('/auth/check', isAuthenticated, checkAuth);
	
	authRouter.patch('/auth/confirm_account/:token', isAuthenticated, verifyAccount);

	// Auth Password
	authRouter.post('/auth/reset_password_request', resetPasswordRequest);
	
	authRouter.patch('/auth/reset_password/:resetPasswordToken', isAuthenticated, resetPassword);
	authRouter.patch('/auth/update_password', middlewares, updatePassword);

	// Auth Roles
	authRouter.patch('/auth/add_role', middlewares, addRole);
	authRouter.patch('/auth/remove_role', middlewares, removeRole);
	
	// Auth User
	authRouter.get('/auth/user/:username', isUsernameTaken);
	
	authRouter.delete('/auth/user/:id', middlewares, deleteUser);
	authRouter.delete('/auth/user', middlewares, deleteSelf);

}; 	