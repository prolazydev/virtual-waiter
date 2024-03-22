import { NextFunction, Response } from 'express';
import { ACCESS_TOKEN_DURATION } from '../utils/constants';
import { rGet, rDel } from '../services/redis.service';
import { findUserByEmail } from '../services/CRUD/user.service';
import { UserResult, MyRequest } from '../types';
import { Message } from '../utils/common/ServerResponseMessages';
import { verifyToken, decodeToken, signToken } from '../utils/crypto';
import { CustomError } from '../utils/errors';
import { asyncErrorHandler } from '../utils/errors/asyncErrorHandler';
import { respond } from '../utils/common/index.js';
import { StatusCodes } from 'http-status-codes';

export const isAuthenticated = asyncErrorHandler(async (req, res, next) => {
	let { accessToken } = req.cookies;

	// Check if there is a token in the header, workaround
	let myToken = req.headers.authorization;
	if (myToken && myToken.startsWith('Bearer')) {
		myToken = myToken.split(' ')[ 1 ];

		accessToken = myToken;
	}

	if ( !accessToken ) 
		return respond(res, StatusCodes.UNAUTHORIZED, Message.NotAuthorized);
		// return next(new CustomError(Message.Unauthorized, 403));

	let userObj: UserResult;

	const payload = verifyToken(accessToken);
	if ( !payload ) {
		const oldToken = decodeToken(accessToken);

		// TODO: Maybe add null checks
		const refreshToken = await rGet(oldToken!.id!);
		const refreshTokenPayload = verifyToken(refreshToken!);
		if ( !refreshTokenPayload ) {
			const deleted = await rDel(oldToken!.id!);
			if ( !deleted )
				return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.DatabaseError);
				// return next(new CustomError(Message.DatabaseError, 500)); 
			return respond(res, StatusCodes.UNAUTHORIZED, Message.NotAuthorized);
			// return next(new CustomError(Message.Unauthorized, 403));
		}

		const user = await findUserByEmail(refreshTokenPayload.email);
		
		if ( !user )
			return respond(res, StatusCodes.UNAUTHORIZED, Message.NotAuthorized);
			// return next(new CustomError(Message.NotAuthenticated, 403));

		userObj = {
			id: user._id.toString(),
			email: user.email,
			username: user.username,
			roles: user.auth!.roles,
		};
		const newAccessToken = signToken(userObj, { expiresIn: ACCESS_TOKEN_DURATION, algorithm: 'RS256' })!;
		res.cookie('accessToken', newAccessToken, {
			maxAge: 2 * 60 * 60 * 1000, // 2h,
			httpOnly: true,
			secure: false, // leave to false in development
			sameSite: 'none'
		});
		res.setHeader('x-set-access-token', newAccessToken);

	} else 
		userObj = {
			id: payload.id!,
			username: payload.username,
			email: payload.email,
			avatar: payload.avatar,
			roles: payload.roles
		};
	req.identity = userObj;
	
	return next();
});

export const isOwner = asyncErrorHandler(async (req, res, next) => {
	try {
		const id = req.params.id || req.query.id || req.body.id;

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

export const isInRole = (...roles: string[]) => {
	return (req: MyRequest, res: Response, next: NextFunction) => {
		const userRoles = req.identity!.roles!;

		const hasAllRoles = roles.every(role => userRoles.includes(role));
		if (!hasAllRoles)
			return next(new CustomError(Message.NotAuthenticated, 403));

		next();
	};
};

export const isAdmin = asyncErrorHandler(async (req, res, next) => {
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

