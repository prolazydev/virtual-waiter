import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Message } from '@/utils/common/ServerResponseMessages';
import { logger } from '@/services/logger.service';

export const respond = <TData = null>(res: Response, statusCode: StatusCodes, message: string | typeof Message | null = null, data: TData | null = null, error: string | Error | unknown = '') => {
	// const status = statusCode >= 200 && statusCode < 300 ? 'success' : 'error';
	let status = '';
	if (statusCode >= 200 && statusCode < 300) status = 'success';
	else {
		status = 'error';
		console.error(error);
		logger.error(error);
	}

	const respondData = { status, data, message };
	return res.status(statusCode).json(respondData);
	
	// if (!isDataEmpty<TData>(data)) {
	// 	respondData = { status, data, message };
	// 	return res.status(statusCode).json(respondData);
	// }
	// else if (!data) {
	// 	respondData = { status, message };
	// 	return res.status(statusCode).json(respondData);
	// } 
};

export const redirect = (res: Response, statusCode: StatusCodes, url: string) => {
	return res.redirect(url);
};