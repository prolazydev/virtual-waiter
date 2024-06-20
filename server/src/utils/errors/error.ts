import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Error } from 'mongoose';
import { Message } from '../common/ServerResponseMessages';
import { respond } from '../common/http';

export const handleError = (res: Response, error: unknown) => {
	console.log('Error: ', error);

	if ( error instanceof Error.ValidationError ) {
		const validationErrors = {};
		Object.keys(error.errors)
			// @ts-expect-error field is a string
			.forEach(field => validationErrors[field] = error.errors[field].message);
		console.log('Validation Errors: ', validationErrors);
		respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput, validationErrors);
	} else if ( error instanceof Error.CastError ) {
		respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.ServerError);
	}
};