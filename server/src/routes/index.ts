import express from 'express';

import { isAdmin, isAuthenticated, isSelfUserOwner } from '@/middlewares/auth.middleware';

import authRouter from './auth.router';
import userRouter from './user.router';
import restaurantRouter from './restaurant.router';
// import restaurantRatingRouter from './restaurantRating.router';
import businessRouter from './business.router';
import businessCategoryRouter from './businessCategory.router';
import productRouter from './products.router';

// const router = express.Router();

/**
 * Registers all the routes and middlewares for the respective routes
 */
export default (router: express.Router): express.Router => {
	authRouter(router, [ isAuthenticated, isSelfUserOwner ]);

	userRouter(router, [ isAuthenticated, isAdmin ]);
	restaurantRouter(router, [ isAuthenticated ]);
	// restaurantRatingRouter(router, [ isAuthenticated ]);

	businessRouter(router, [ isAuthenticated, isAdmin ]);
	businessCategoryRouter(router, [ isAuthenticated, isAdmin ]);

	productRouter(router, [ isAuthenticated ]);

	// router.get('/static', (req, res) => res.send({ message: 'Static response' }));

	return router;
};