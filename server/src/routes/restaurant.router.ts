import { RequestHandler, Router } from 'express';
import { deleteUserRestaurantsTransaction, getAllRestaurants, getRestaurantById, getRestaurantsByCustomQuery, getRestaurantsByName, getRestaurantsByUserId, registerRestaurant, updateRestaurantById } from '../controllers/restaurant.controller';
import { deleteRestaurantById } from '../services/CRUD/restaurant.service';

export default (restaurantRouter: Router, middlewares: RequestHandler[] | RequestHandler = []) => {
	restaurantRouter.post('/restaurant', middlewares, registerRestaurant);

	restaurantRouter.get('/restaurant', middlewares, getAllRestaurants);
	restaurantRouter.get('/restaurant/:id', middlewares, getRestaurantById);
	restaurantRouter.get('/restaurant/user/:userId', middlewares, getRestaurantsByUserId);
	restaurantRouter.get('/restaurant/name/:name', middlewares, getRestaurantsByName);
	restaurantRouter.get('/restaurant/custom', middlewares, getRestaurantsByCustomQuery);

	restaurantRouter.patch('/restaurant/:id', middlewares, updateRestaurantById);

	restaurantRouter.delete('/restaurant/:id', middlewares, deleteRestaurantById);
	restaurantRouter.delete('/restaurant/user/:userId', middlewares, deleteUserRestaurantsTransaction);
};