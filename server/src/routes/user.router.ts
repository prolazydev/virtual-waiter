import type { RequestHandler, Router } from 'express';
import multer from 'multer';
import { isOwner } from '../middlewares/auth.middleware.js';
import { getUserMe, getAllUsers, getUserById, deleteUser, updateUser, updateUserAvatar } from '../controllers/user.controller.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

// TODO: Implement Caching
/**
 * Middleware for applying common middlewares and caching to specific routes.
 *
 * @param {Router} router - The Express router to which routes will be added.
 * @param {RequestHandler[] | RequestHandler} [middlewares=[]] - Middlewares to be applied to all routes.
 */
export default (router: Router, middlewares: RequestHandler[] | RequestHandler = []) => {
	router.get('/user', middlewares, getAllUsers);
	router.get('/user/me', middlewares, getUserMe);
	router.get('/user/:id', middlewares, getUserById);

	router.delete('/user/:id', middlewares, isOwner, deleteUser);
	
	router.patch('/user/:id', middlewares, updateUser);
	router.patch('/userAvatar/:id', middlewares, upload.single('file'), updateUserAvatar);
};
