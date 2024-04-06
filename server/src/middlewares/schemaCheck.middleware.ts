import type { Validatable } from '../types';
import { respond } from '../utils/common';
import { StatusCodes } from 'http-status-codes';
import { Message } from '../utils/common/ServerResponseMessages';
import { requestHandler } from '../utils/errors/asyncErrorHandler';

// export const validateObject = <T extends Validatable>(req: Request, res: Response, next: NextFunction): boolean => {
// 	// Check if all required properties are present and have correct types
// 	for (const key in obj) {
// 		if (obj[key] === undefined || obj[key] === null) {
// 			console.log(`Property ${key} is missing`);
// 			return false;
// 		}

// 	}
	
// 	return true;
// };
export const validateObject = <T>() => requestHandler<Validatable<T>>(async (req, res, next) => {
	const obj = req.body;
	const missingProperties = [];	
	const schema: Validatable<T> = req.body;


	const typeErrors: { key: string, expected: string, received: string }[] = [];

	for (const key in obj) {
		if (obj[key] === undefined || obj[key] === null) 
			missingProperties.push(key);
		else {
			const expectedType = typeof schema[key];
			const receivedType = typeof obj[key];

			if ( expectedType !== receivedType ) 
				typeErrors.push({ key, expected: expectedType, received: receivedType });
		}
	}

	if (missingProperties.length > 0) {
		console.log(`Missing properties: ${missingProperties.join(', ')}`);
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
	}
  
	if (typeErrors.length > 0) {
		const errorMessages = typeErrors.map(
			error => `Property '${error.key}' expected type ${error.expected}, received ${error.received}`
		);
		console.log(`Type errors: ${errorMessages.join(', ')}`);

		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
	}
  
	next(); // If validation passes, call next middleware
});

const validateObjectProperties = () => {
	return requestHandler(async (req, res, next) => {

		
		next(); // If validation passes, call next middleware
	});
};


// export const validateObject = <T extends Validatable>(obj: T) => {
// 	return (res: Response, next: NextFunction) => {
// 		// Check if all required properties are present and have correct types
// 		for (const key in obj) {
// 			if (obj[key] === undefined || obj[key] === null) {
// 				console.log(`Property ${key} is missing`);
// 				// return false;
// 				return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
// 			}
	
// 		}
		
// 		return true;
// 	};
// };
