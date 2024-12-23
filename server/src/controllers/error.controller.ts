import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomError } from '@/utils/errors';
import { respond } from '@/utils/common/http';

const devErrors = (res: Response, error: CustomError) => {
	// res.status(error.statusCode).json({
	// 	status: error.statusCode,
	// 	message: error.message,
	// 	stackTrace: error.stack,
	// 	error: error
	// });

	respond(res, error.statusCode, error.message, { stackTrace: error.stack, error });
};

const prodErrors = (res: Response, error: CustomError) => {
	if ( error.isOperational ) 
		// res.status(error.statusCode).json({
		// 	status: error.statusCode,
		// 	message: error.message
		// });
		respond(res, error.statusCode, error.message);
	else
		// res.status(500).json({
		// 	status: 'error',
		// 	message: 'Unexpected error, please try again!'
		// });
		respond(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Unexpected error, please try again!');
};

const castErrorHandler = (error: CustomError) => {
	// const errValue: string = get(error, 'value.path');
	// const errPath: string = get(error, 'path');

	// TODO: Fix typing
	const errValue: string = (error.value as any).path;
	const errPath: string = error.path as any;

	const msg = `Invalid value for ${errPath}: ${errValue}`;

	return new CustomError(msg, 400);
};

const handleTokenExpiredError = (error: CustomError) => {
	console.log('JWT expired error: ', error);
	return new CustomError('JWT has expired. Please login!', 401);
};

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
export function globalErrorHandler(error: CustomError, req: Request, res: Response, next: NextFunction) {
	error.statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
	error.status = error.status || 'error';

	if (process.env.NODE_ENV === 'development') 
		devErrors(res, error);
	else if (process.env.NODE_ENV === 'production') {
		// let myErr = structuredClone(error);
		if (error.name === 'CastError') 
			error = castErrorHandler(error);
		if (error.name === 'TokenExpiredError')
			error = handleTokenExpiredError(error);

		// TODO: Handle other errors here
		
		prodErrors(res, error);
	}
}