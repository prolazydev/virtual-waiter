import { Router } from 'express';

import { middlewareRequest } from '@/types';

import { deleteSelf, deleteUser } from '@/controllers/user.controller';
import { isAuthenticated } from '@/middlewares/auth.middleware';

import { updatePassword, addRole, loginWithEmail, register, testAuth, forgotPasswordRequest, changeForgottenPassword, resetPasswordRequest, resetPassword, removeRole, isUsernameTaken, verifyAccount, loginWithUsername, logout, checkAuth } from '@/controllers/auth.controller';

/**
 * Registers all the routes and middlewares for the Auth routes
 * @param {Router} authRouter - Main router for all routes
 * @param {middlewareRequest} [middlewares=[]] - Middlewares to be applied to all routes
 */
export default (authRouter: Router, middlewares: middlewareRequest = []) => {
	// Auth Test
	registerTestingRoutes(authRouter);

	// Auth Process, Login, Register, Logout etc.
	registerAuthRoutes(authRouter);

	// Auth Password, Forgot Password, Reset Password etc.
	registerAuthPasswordRoutes(authRouter, middlewares);

	// Auth Roles and Permissions
	registerAuthRoleRoutes(authRouter, middlewares);
	
	// Auth User, CRUD operations on user
	registerCRUDRoutes(authRouter, middlewares);
}; 	

function registerCRUDRoutes(authRouter: Router, middlewares: middlewareRequest) {
	authRouter.get('/auth/user/:username', isUsernameTaken);

	authRouter.delete('/auth/user/:id', middlewares, deleteUser);
	authRouter.delete('/auth/user', middlewares, deleteSelf);
}

function registerAuthRoleRoutes(authRouter: Router, middlewares: middlewareRequest) {
	authRouter.patch('/auth/add_role', middlewares, addRole);
	authRouter.patch('/auth/remove_role', middlewares, removeRole);
}

function registerAuthPasswordRoutes(authRouter: Router, middlewares: middlewareRequest) {
	authRouter.post('/auth/forgot_password_request', forgotPasswordRequest);
	authRouter.post('/auth/change_forgotten_password', changeForgottenPassword);

	authRouter.post('/auth/reset_password_request', resetPasswordRequest);

	authRouter.patch('/auth/reset_password/:resetPasswordToken', isAuthenticated, resetPassword);
	authRouter.patch('/auth/update_password', middlewares, updatePassword);
}

function registerAuthRoutes(authRouter: Router) {
	authRouter.post('/auth/register', register);
	authRouter.post('/auth/login', loginWithEmail);
	authRouter.post('/auth/login_with_username', loginWithUsername);
	authRouter.post('/auth/logout', isAuthenticated, logout);

	authRouter.get('/auth/check', isAuthenticated, checkAuth);

	authRouter.patch('/auth/confirm_account/:token', isAuthenticated, verifyAccount);
}

function registerTestingRoutes(authRouter: Router) {
	authRouter.all('/auth/test/:testParam', testAuth);
	authRouter.all('/auth/test', testAuth);
}
