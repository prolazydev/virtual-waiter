import mongoose from 'mongoose';
import { NextFunction, Response, type CookieOptions } from 'express';

import { ACCESS_TOKEN_DURATION } from '@/utils/constants';
import { findUserByEmail } from '@/services/CRUD/user.service';
import { UserResult, MyRequest } from '@/types';
import { Message } from '@/utils/common/ServerResponseMessages';
import { verifyToken, decodeToken, signToken } from '@/utils/crypto';
import { CustomError } from '@/utils/errors';
import { requestHandler } from '@/utils/common/asyncErrorHandler';
import { StatusCodes } from 'http-status-codes';
import { respond } from '@/utils/common/http';
import { getValidAccessToken, getValidRefreshToken } from '@/utils/common/auth.util';

export const isAuthenticated = requestHandler(async (req, res, next) => {
	const accessToken = getValidAccessToken(req);

	if ( !accessToken ) 
		return respond(res, StatusCodes.UNAUTHORIZED, Message.NotAuthorized);

	let userObj: UserResult;

	// TODO: Refactor to validate the error
	const { payload, err: payloadErr } = verifyToken<UserResult>(accessToken);

	if (payload) {
		userObj = {
			id: payload.id!,
			username: payload.username,
			email: payload.email,
			avatar: payload.avatar,
			roles: payload.roles
		};
	} else {
		const oldToken = decodeToken<UserResult>(accessToken);
		if ( !oldToken )
			return respond(res, StatusCodes.UNAUTHORIZED, Message.NotAuthorized);

		const refreshToken = await getValidRefreshToken(oldToken!.id!);
		if ( !refreshToken )
			return respond(res, StatusCodes.UNAUTHORIZED, Message.NotAuthorized);
		
		const user = await findUserByEmail(refreshToken!.email);
		if ( !user )
			return respond(res, StatusCodes.UNAUTHORIZED, Message.NotAuthorized);

		userObj = {
			id: user._id.toString(),
			email: user.email,
			username: user.username,
			roles: user.auth!.roles,
		};
		
		const newAccessToken = signToken(userObj, { expiresIn: ACCESS_TOKEN_DURATION, algorithm: 'RS256' })!;
		const cookieOptions: CookieOptions = {
			// maxAge: 10000, // 10s, for testing
			maxAge: refreshToken!.rememberMe ? 30 * 24 * 1 * 60 * 60 * 1000 : 5 * 60 * 1000, // 30d or 5m,
			httpOnly: true,
			secure: true, 
			// secure: NODE_ENV === 'production', // leave to false in development
			sameSite: 'none',
			signed: true,
		};
		res.cookie('accessToken', newAccessToken, cookieOptions);

		res.setHeader('x-set-access-token', newAccessToken);
		console.log(`New access token set for user: ${userObj.username}`);
	} 
		

	req.identity = userObj;
	
	return next();
});

export const isSelfUserOwner = requestHandler(async (req, res, next) => {
	try {
		const id = req.params.id || req.query.id || req.body.id;

		// const test = req.params[Object.keys(req.params).find(key => key.toLowerCase().includes('id'))!]
		// 	|| req.query[Object.keys(req.query).find(key => key.toLowerCase().includes('id'))!]
		// 	|| req.body[Object.keys(req.body).find(key => key.toLowerCase().includes('id'))!];
		
		// console.log(test);


		const currentUserId = req.identity!.id;
		
		if ( !currentUserId )
			return next(new CustomError(Message.MissingCredentials, 400));

		if (currentUserId !== id)
			return next(new CustomError(Message.NotAuthorized, StatusCodes.UNAUTHORIZED));

		next();
	} catch (err) {
		console.log(err);
		return next(new CustomError(Message.ServerError, 500));
	}
});
/**
 * Check if the user is the owner of the item
 */
export const isSelfItemOwner = requestHandler(async (req, res, next, collectionName: string) => {
	try {
		const id = req.params.id || req.query.id || req.body.id;
		// const test = req.params[Object.keys(req.params).find(key => key.toLowerCase().includes('id'))!]
		// 	|| req.query[Object.keys(req.query).find(key => key.toLowerCase().includes('id'))!]
		// 	|| req.body[Object.keys(req.body).find(key => key.toLowerCase().includes('id'))!];
		// console.log(test);

		const authUserId = req.identity!.id;
		if ( !authUserId || id.length !== 24)
			return next(new CustomError(Message.MissingCredentials, 400));

		// Set the collection to be used
		const collection = mongoose.connection!.db!.collection(collectionName);
		if ( !collection )
			return next(new CustomError(Message.NotFound, StatusCodes.NOT_FOUND));

		const item = await collection.findOne({ _id: mongoose.Types.ObjectId.createFromHexString(id) }, { projection: { userId: 1 } });
		// TODO: Maybe change the response to bad request or not authorized
		if ( !item )
			return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

		if (item.userId.toString() !== authUserId)
			return respond(res, StatusCodes.FORBIDDEN, Message.Unauthorized);

		next();
	} catch (err) {
		console.log(err);
		return next(new CustomError(Message.ServerError, 500));
	}
});

export const isInRole = (...roles: string[]) => {
	return (req: MyRequest, res: Response, next: NextFunction) => {
		const userRoles = req.identity!.roles!;

		const hasAllRoles = roles.every(role => userRoles.includes(role));
		if (!hasAllRoles)
			return next(new CustomError(Message.NotAuthenticated, 403));

		next();
	};
};

export const isAdmin = requestHandler(async (req, res, next) => {
	try {
		const userRoles = req.identity!.roles!;

		const hasAdminRole = userRoles.includes('admin');
		if ( !hasAdminRole ) 
			return next(new CustomError(Message.NotAuthorized, 403));

		next();
	} catch (err) {
		console.log(err);
		return next(new CustomError(Message.ServerError, 500));
	}
} );
