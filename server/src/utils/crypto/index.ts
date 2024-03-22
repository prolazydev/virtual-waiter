/* eslint-disable  @typescript-eslint/no-explicit-any */
import jwt, { SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { UserResult, MyJwtPayload } from '../../types';
import { REFRESH_TOKEN_DURATION, TEST_SECRET_PRIVATE_JWT, TEST_SECRET_PUBLIC_JWT, SECRET } from '../constants';

/**
 * Creates random base64 salt of the password
 */
export const randomSalt = () => 
	crypto.randomBytes(128).toString('base64');

/**
 * Hashes the password with the salt
 */
export const hashPassword = (salt: string, password: string) => 
	crypto
		.createHmac('sha256', [ salt, password ]
			.join('/'))
		.update(SECRET)
		.digest('hex');

export const mergeObjects = (defaultObj: object, mergingObj: object) => {
	const merged = { ...defaultObj };

	// for (const key in mergingObj) 
	// 	if (mergingObj.hasOwnProperty(key)) 
	// 		merged[ key ] = mergingObj[ key ];
	// TODO: May need fixing
	for (const key in mergingObj) 
		if (Object.prototype.hasOwnProperty.call(mergingObj, key)) 
			(merged as any)[ key ] = (mergingObj as any)[ key ];

	return merged;
};

export const passwordMatch = (password: string, dbPassword: string, salt: string) => 
	hashPassword(salt, password) === dbPassword;
	// const expectedHash = hashPassword(salt, password);
	// return expectedHash === dbPassword;


export const signToken = (userObj: UserResult, tokenOptions: SignOptions = { expiresIn: REFRESH_TOKEN_DURATION }) => {
	try {
		const defaultTokenOptions: SignOptions = { issuer: 'Virtual-Waiter', };
		const mergedTokenOptions = mergeObjects(tokenOptions, defaultTokenOptions);

		// const test = process.env.TEST_SECRET_PRIVATE_JWT;
	
		const signedToken = jwt.sign(userObj, `${TEST_SECRET_PRIVATE_JWT}`, mergedTokenOptions);
		// jwt.sign(userObj, `${TEST_SECRET_PRIVATE_JWT}`, mergedTokenOptions, function(err, token) {
		// 	console.log(token);
		// });
		return signedToken;
	
	} catch (err) {
		console.log('JWT ERROR: ', err);
		return null;
	}
};
	
export const verifyToken = (token: string) => {
	try {
		const verified = jwt.verify(token, TEST_SECRET_PUBLIC_JWT, { algorithms: [ 'RS256' ], } ) as MyJwtPayload;
		return verified;
	} catch (err: jwt.JsonWebTokenError | Error | any) {
		if (err instanceof jwt.JsonWebTokenError) {
			if (err.name === 'TokenExpiredError')
				return null;
			console.log('JWT ERROR: ', err);
		}
	}
};
	
export const decodeToken = (token: string) => {
	try {
		return jwt.decode(token) as MyJwtPayload;
	} catch (err) {
		console.log(err);
		return null;
	}
};

