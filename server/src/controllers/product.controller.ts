import { StatusCodes } from 'http-status-codes';
import { respond } from '../utils/common';
import { Message } from '../utils/common/ServerResponseMessages';
import { asyncErrorHandler } from '../utils/errors/asyncErrorHandler';
import { createProduct, findProductById, findAllProducts } from '../services/CRUD/product.service';
import type { Product } from '../db/models/Product';

export const registerProduct = asyncErrorHandler<Product>(async (req, res) => {
	const product = req.body;
	if ( !product ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
		// return next(new CustomError(Message.InvalidInput, StatusCodes.BAD_REQUEST));

	const newProduct = await createProduct(product);
	if ( !newProduct ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
		// return next(new CustomError(Message.NotFound, StatusCodes.NOT_FOUND));
	
	respond(res, StatusCodes.OK, Message.SuccessCreate, newProduct);
});

export const getAllProducts = asyncErrorHandler(async (req, res) => {
	try {
		const products = await findAllProducts();
		respond(res, StatusCodes.OK, Message.SuccessRead, products);
	} catch (error) {
		respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.ServerError, '', error);
	}
});

export const getProductById = asyncErrorHandler(async (req, res) => {
	const id = req.params.id;
	if ( !id ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
		// return next(new CustomError(Message.InvalidInput, StatusCodes.BAD_REQUEST));

	const product = await findProductById(id);
	if ( !product ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
		// return next(new CustomError(Message.NotFound, StatusCodes.NOT_FOUND));

	respond(res, StatusCodes.OK, Message.SuccessRead, product);
});