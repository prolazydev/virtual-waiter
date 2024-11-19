import { StatusCodes } from 'http-status-codes';

type KeyStatusCodes = typeof StatusCodes[keyof typeof StatusCodes];

/**
 * Custom Error Class for handling predicted errors
 * @param message The generic error message
 * @param {KeyStatusCodes} [statusCode=404] - The error status code. Defaults to 404
 */ 
export class CustomError<TValue = Error, TPath = unknown> extends Error {
	constructor(message: string, statusCode: KeyStatusCodes = StatusCodes.NOT_FOUND) {
		super(message);
		
		this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
		this.statusCode = statusCode;
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}

	status: 'fail' | 'error';
	statusCode: number;
	isOperational: boolean = true;
	code?: number;
	value: TValue | unknown;
	path: TPath | unknown;
}
