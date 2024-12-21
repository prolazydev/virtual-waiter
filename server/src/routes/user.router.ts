import type { RequestHandler, Router } from 'express';
import multer from 'multer';

import { isAuthenticated, isSelfUserOwner } from '@/middlewares/auth.middleware.js';
import { getUserMe, getAllUsers, deleteUser, updateUser, updateUserAvatar, getUserByUsername } from '@/controllers/user.controller.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * Middleware for applying common middlewares and caching to specific routes.
 *
 * @param {Router} router - The Express router to which routes will be added.
 * @param {RequestHandler[] | RequestHandler} [middlewares=[]] - Middlewares to be applied to all routes.
 */
export default (router: Router, middlewares: RequestHandler[] | RequestHandler = []) => {
	router.get('/user', middlewares, getAllUsers);
	router.get('/user/me', isAuthenticated, getUserMe);
	// router.get('/user/:id', isAuthenticated, getUserById);
	router.get('/user/:username', isAuthenticated, getUserByUsername);

	router.delete('/user/self', middlewares, isSelfUserOwner, deleteUser);
	router.delete('/user/:id', middlewares, isSelfUserOwner, deleteUser);
	
	router.patch('/user/self', isAuthenticated, isSelfUserOwner, updateUser);
	router.patch('/user/:id', middlewares, updateUser);
	router.patch('/userAvatar/:id', isAuthenticated, upload.single('file'), updateUserAvatar);
};
