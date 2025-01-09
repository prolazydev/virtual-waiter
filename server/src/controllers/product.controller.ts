import { StatusCodes } from 'http-status-codes';

import type { Product } from '@/db/models/Product';

import { respond } from '@/utils/common/http';
import { Message } from '@/utils/common/ServerResponseMessages';
import { requestHandler } from '@/utils/common/asyncErrorHandler';

import { createProduct, findProductById, findAllProducts, findProductsByBusinessId } from '@/services/CRUD/product.service';

// #region POST
export const addProduct = requestHandler<Product>(async (req, res) => {
	const product = req.body;
	if ( !product ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const newProduct = await createProduct(product);
	if ( !newProduct ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
	
	respond(res, StatusCodes.OK, Message.SuccessCreate, newProduct);
});
// #endregion

// #region GET
export const getAllProducts = requestHandler(async (req, res) => {
	try {
		const products = await findAllProducts();
		respond(res, StatusCodes.OK, Message.SuccessRead, products);
	} catch (error) {
		respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.ServerError, '', error);
	}
});

export const getProductById = requestHandler(async (req, res) => {
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

export const getAllProductsByBusinessId = requestHandler(async (req, res) => {
	const businessId = req.params.businessId;
	if ( !businessId ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const products = await findProductsByBusinessId(businessId).lean();
	if ( !products ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessRead, products);
});
// #endregion