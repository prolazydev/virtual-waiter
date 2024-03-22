import express from 'express';
// import restaurantRouter from './restaurant.router';
import authRouter from './auth.router';
import { isAdmin, isAuthenticated, isOwner } from '../middlewares/auth.middleware';
import userRouter from './user.router';
import restaurantRouter from './restaurant.router';
import restaurantRatingRouter from './restaurantRating.router';

const router = express.Router();

/**
 * Registers all the routes and middlewares for the respective routes
 */
export default (): express.Router => {
	// TODO: Add auth middleware
	authRouter(router, [ isAuthenticated, isOwner ]);

	userRouter(router, [ isAuthenticated, isAdmin ]);
	restaurantRouter(router, [ isAuthenticated ]);
	restaurantRatingRouter(router, [ isAuthenticated ]);
	// router.use(authRoutes);

	// router.stack.forEach((r) => {
	// 	console.log(r.route);
	// });
	return router;
};