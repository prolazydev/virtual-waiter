/* eslint-disable @typescript-eslint/no-explicit-any */

import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Message } from './ServerResponseMessages';
import { logger } from '../../services/logger.service';

/**
 * Convert a date to a cron expression
 * @param {DATE} date The date to convert
 */
export function dateToCronExpression(date: Date) {
	const minutes = date.getMinutes();
	const hours = date.getHours();
	const day = date.getDate();
	const month = date.getMonth() + 1; // Months are zero-based
	// const year = date.getFullYear();
  
	return `${minutes} ${hours} ${day} ${month} *`; // Run every minute at the specified date and time
}

export function respond<TData = null>(res: Response, statusCode: StatusCodes, message: string | typeof Message, data: TData | null = null, error: string | Error | any = '') {
	// const status = statusCode >= 200 && statusCode < 300 ? 'success' : 'error';
	let status = '';
	if (statusCode >= 200 && statusCode < 300) status = 'success';
	else {
		status = 'error';
		console.error(error);
		logger.error(error);
	}

	let respondData = {};
	if (!isDataEmpty<TData>(data)) {
		respondData = { status, data, message };
		return res.status(statusCode).json(respondData);
	}
	else if (!data) {
		respondData = { status, message };
		return res.status(statusCode).json(respondData);
	} 
}

function isDataEmpty<TData = null>(data: TData | null = null) {
	return data === null || data === undefined || data === '';
}

// TODO: maybe implement a mail service
// export function mail(to: string, subject: string, html: string) {
// const msg = {
// 	to,
// 	from: process.env.EMAIL_USER,
// 	subject,
// 	html,
// };
// sgMail.send(msg);
// }
