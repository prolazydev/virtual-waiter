import jwt, { SignOptions, type JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';
import { UserResult } from '../../types';
import { REFRESH_TOKEN_DURATION, TEST_SECRET_PRIVATE_JWT, TEST_SECRET_PUBLIC_JWT, SECRET } from '../constants';
import { mergeSameObjects } from '../common';

/**
 * Creates random base64 salt of the password
 */
export const randomSalt = () => 
	crypto.randomBytes(128).toString('base64');

/**
 * Hashes the password with the salt
 */
export const hashPassword = (salt: string, password: string) => {
	const hash = crypto.createHmac('sha256', [ salt, password ]
		.join('/'))
		.update(SECRET)
		.digest('hex');

	return hash;
};
/** Hashes the incoming password and compares it with the Users password hash */
export const passwordMatch = (password: string, dbPassword: string, salt: string) => 
	hashPassword(salt, password) === dbPassword;
	// const expectedHash = hashPassword(salt, password);
	// return expectedHash === dbPassword;

export const signToken = (userObj: UserResult, tokenOptions: SignOptions = { expiresIn: REFRESH_TOKEN_DURATION }) => {
	try {
		const defaultTokenOptions: SignOptions = { issuer: 'Virtual-Waiter' };
		const mergedTokenOptions = mergeSameObjects(tokenOptions, defaultTokenOptions);

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
	
export const verifyToken = <T extends JwtPayload>(token: string) => {
	try {
		const payload = jwt.verify(token, TEST_SECRET_PUBLIC_JWT, { algorithms: [ 'RS256' ], } ) as T;
		return { payload, err: null };
	} catch (err: jwt.JsonWebTokenError | Error | any) {
		const payload = null;
		if (err instanceof jwt.TokenExpiredError) {
			// console.log('JWT ERROR: ', err);
			if ( err.name === 'TokenExpiredError' )
				return { payload, err: 'Expired' };
			else if ( err.message === 'jwt malformed' )
				return { payload, err: 'Malformed' };
		}
		
		return { payload, err };
	}
};
	
export const decodeToken = <T extends JwtPayload>(token: string) => {
	try {
		return jwt.decode(token) as T;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const createToken = () => {
	const token = crypto.randomBytes(32).toString('hex');
	const hashToken = crypto.createHash('sha256').update(token).digest('hex');
	return { token, hashToken };
};

export const generateRandom4DigitNumber = () => {
	// Generate a random number between 1000 and 9999 (inclusive)
	const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
	return randomNumber;
};

