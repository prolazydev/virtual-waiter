import { StatusCodes } from 'http-status-codes';
import crypto from 'crypto';

import { CookieOptions, Response } from 'express';
import { LoginRequest, RegisterRequest, UpdatePasswordRequest, UserResult, type LoginWithUsernameRequest } from '../types';
import { asyncErrorHandler } from '../utils/errors/asyncErrorHandler';
import { Message } from '../utils/common/ServerResponseMessages';
import { createConfirmAccountToken, createResetPasswordToken, createUser, findUserByCustomQuery, findUserByEmail, findUserById, userExists } from '../services/CRUD/user.service';
import { randomSalt, passwordMatch, signToken } from '../utils/crypto';
import { respond } from '../utils/common';
import { REFRESH_TOKEN_DURATION, ACCESS_TOKEN_DURATION, REDIS_REFRESH_TOKEN_EXPIRY_TIME } from '../utils/constants';
import { rDel, rSet } from '../services/redis.service';
import { sendEmail } from '../utils/email';

export const testAuth = asyncErrorHandler(async (req, res) => {
	console.log(req.body);
	console.log(req.params);
	respond(res, StatusCodes.CREATED, Message.SuccessCreate, { ...req.body, ...req.params });
});

/**
 * Registers a new user. 
 * Necessary parameters:
 * @param email 
 * @param password 
 * @param username 
 */
export const register = asyncErrorHandler<RegisterRequest>(async (req, res) => {
	const { email, username, password, confirmPassword, becomeChef } = req.body;

	if (!email || !password || !username || !confirmPassword)
		return respond(res, StatusCodes.BAD_REQUEST, Message.MissingCredentials);
	// return next(new CustomError(Message.MissingCredentials, StatusCodes.BAD_REQUEST));

	if (password !== confirmPassword)
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidCredentials);
	// return next(new CustomError(Message.InvalidCredentials, StatusCodes.BAD_REQUEST));

	const user = await findUserByEmail(email);
	if (user)
		return respond(res, StatusCodes.CONFLICT, Message.AlreadyExists);
	// return next(new CustomError(Message.AlreadyExists, StatusCodes.CONFLICT));

	const salt = randomSalt();
	const roles = becomeChef ? [ 'user', 'chef' ] : [ 'user' ];
	const newUser = await createUser({
		email,
		username,
		auth: {
			salt,
			password,
			roles,
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	});

	if (!newUser)
		return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.DatabaseError);
	// return next(new CustomError(Message.DatabaseError, StatusCodes.INTERNAL_SERVER_ERROR));

	const confirmAccountToken = createConfirmAccountToken(newUser);
	await newUser.save({ validateBeforeSave: false });

	// SEND EMAIL
	const confirmURL = `${req.protocol}://${req.get('host')}/api/confirm_account/${confirmAccountToken}`;
	const message = `Welcome to the platform! Please confirm your account by clicking on the link: ${confirmURL}.\n\nThis confirmation link will be valid for only 1 day!\nIf you didn't create an account, please ignore this email!`;
	console.log(message);
	try {
		await sendEmail({
			email: newUser.email,
			subject: 'Account Confirmation link',
			message
		});

		return respond(res, StatusCodes.CREATED, Message.SuccessCreate, true);
		// return respond(res, StatusCodes.CREATED, Message.SuccessCreate, true);
	} catch (error) {
		newUser.confirmAccountToken = undefined;
		newUser.confirmAccountTokenExpiry = undefined;
		await newUser.save({ validateBeforeSave: false });

		return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.MailErrorSend, false);
		// return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.MailErrorSend, false);
	}
});

export const login = asyncErrorHandler<LoginRequest>(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password)
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidCredentials);
	// return next(new CustomError(Message.InvalidCredentials, 400));

	const user = await findUserByEmail(email).select('+auth.salt +auth.password');
	if (!user)
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
	// return next(new CustomError(Message.NotFound));
	if (!passwordMatch(password, user.auth!.password, user.auth!.salt))
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidCredentials);
	// return next(new CustomError(Message.InvalidCredentials, 400));

	const userObj: UserResult = {
		id: user._id.toString(),
		email: user.email,
		username: user.username,
		roles: user.auth!.roles,
	};

	const accessToken = await tokenLoginUser(res, userObj);

	if (!accessToken)
		return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.JWTError);
	// next(new CustomError(Message.JWTError, StatusCodes.INTERNAL_SERVER_ERROR));

	respond(res, StatusCodes.OK, Message.SuccessLogin, userObj);
});

export const loginWithUsername = asyncErrorHandler<LoginWithUsernameRequest>(async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password)
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidCredentials);

	const user = await findUserByCustomQuery({ username }).select('+auth.salt +auth.password');
	if (!user)
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
	if (!passwordMatch(password, user.auth!.password, user.auth!.salt))
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidCredentials);

	const userObj: UserResult = {
		id: user._id.toString(),
		email: user.email,
		username: user.username,
		roles: user.auth!.roles,
	};

	const accessToken = await tokenLoginUser(res, userObj);

	if (!accessToken)
		return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.JWTError);

	respond(res, StatusCodes.OK, Message.SuccessLogin, userObj);
});

export const logout = asyncErrorHandler(async (req, res) => {
	const { id } = req.identity!;
	const isDeleted = await rDel(id);
	if (isDeleted === 0)
		return respond(res, StatusCodes.BAD_REQUEST, Message.NotFound);

	res.clearCookie('accessToken');
	
	respond(res, StatusCodes.OK, Message.SuccessUpdate);
});


export const addRole = asyncErrorHandler<{ id: string, role: string; }>(async (req, res) => {
	const { id, role } = req.body;
	const user = await findUserById(id);
	if (!user)
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
	// return next(new CustomError(Message.NotFound));

	if (user.auth!.roles.includes(role))
		return respond(res, StatusCodes.CONFLICT, Message.AlreadyExists);
	// return next(new CustomError(Message.AlreadyExists, StatusCodes.CONFLICT));

	user.auth!.roles.push(role);
	await user.save();

	respond(res, StatusCodes.OK, Message.SuccessUpdate);
});

export const removeRole = asyncErrorHandler(async (req, res) => {
	const { id, role } = req.body;
	const user = await findUserById(id);
	if (!user)
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
	// return next(new CustomError(Message.NotFound, StatusCodes.NOT_FOUND));

	user.auth!.roles = user.auth!.roles.filter((r) => r !== role);
	await user.save();

	respond(res, StatusCodes.OK, '', Message.SuccessUpdate);
});

export const updatePassword = asyncErrorHandler<UpdatePasswordRequest>(async (req, res) => {
	const { id } = req.identity!;
	const { oldPassword, newPassword, confirmNewPassword } = req.body;

	if (!oldPassword || !newPassword || !confirmNewPassword)
		return respond(res, StatusCodes.BAD_REQUEST, Message.MissingCredentials);
	// return next(new CustomError(Message.MissingCredentials, 400));
	if (newPassword !== confirmNewPassword)
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidCredentials);
	// return next(new CustomError(Message.InvalidCredentials, 400));

	const user = await findUserById(id).select('+auth.salt +auth.password');
	if (!user)
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
	// return next(new CustomError(Message.NotFound));

	if (!passwordMatch(oldPassword, user.auth!.password, user.auth!.salt))
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidCredentials);
	// return next(new CustomError(Message.InvalidCredentials, 400));

	user.auth!.password = newPassword;
	await user.save();

	respond(res, StatusCodes.OK, Message.SuccessUpdate);
});

export const resetPasswordRequest = asyncErrorHandler(async (req, res) => {
	const { id } = req.identity!;
	const user = await findUserById(id);
	if (!user)
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
	// 	return next(new CustomError(Message.NotFound, StatusCodes.NOT_FOUND));

	// const resetPasswordToken = (user as any).createResetPasswordToken();
	const resetPasswordToken = createResetPasswordToken(user);
	await user.save({ validateBeforeSave: false });

	// SEND EMAIL
	const resetURL = `${req.protocol}://${req.get('host')}/api/reset_password/${resetPasswordToken}`;
	const message = `We have received a Password Reset Request! Please use the link attached to this email to reset your password: ${resetURL}.\n\nThis reset password link will be valid for only 10 minutes!\nIf you didn't forget your password, please ignore this email!`;
	try {
		await sendEmail({
			email: user.email,
			subject: 'Password Reset link request',
			message
		});

		respond(res, StatusCodes.OK, Message.EmailPasswordSend, { resetPasswordToken });
	} catch (error) {
		user.passwordResetToken = undefined;
		user.passwordResetTokenExpiry = undefined;
		await user.save({ validateBeforeSave: false });

		respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.EmailPasswordResetError);
		// return next(new CustomError(Message.EmailPasswordResetError, StatusCodes.INTERNAL_SERVER_ERROR));		
	}
});

export const resetPassword = asyncErrorHandler(async (req, res) => {
	const { resetPasswordToken } = req.params;
	const { resetPassword, confirmResetPassword } = req.body;

	if (!resetPasswordToken || !resetPassword || !confirmResetPassword)
		return respond(res, StatusCodes.BAD_REQUEST, Message.MissingCredentials);
	// next(new CustomError(Message.MissingCredentials, StatusCodes.BAD_REQUEST));

	if (resetPassword !== confirmResetPassword)
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidCredentials);
	// return next(new CustomError(Message.InvalidCredentials, StatusCodes.BAD_REQUEST));

	const token = crypto.createHash('sha256').update(resetPasswordToken).digest('hex');
	const user = await findUserByCustomQuery({ passwordResetToken: token, passwordResetTokenExpiry: { $gt: Date.now() } });
	if (!user)
		return respond(res, StatusCodes.BAD_REQUEST, Message.JWTTokenError);
	// return next(new CustomError('Token is invalid or has expired!', StatusCodes.BAD_REQUEST));

	user.auth!.password = resetPassword;

	user.passwordResetToken = undefined;
	user.passwordResetTokenExpiry = undefined;
	await user.save();

	// LOGIN USER
	const userObj: UserResult = {
		id: user._id.toString(),
		email: user.email,
		username: user.username,
		roles: user.auth!.roles,
	};
	const accessToken = await tokenLoginUser(res, userObj);
	if (!accessToken)
		return respond(res, StatusCodes.UNAUTHORIZED, Message.JWTTokenError);
	// return next(new CustomError(Message.JWTError, StatusCodes.INTERNAL_SERVER_ERROR));

	respond(res, StatusCodes.OK, Message.SuccessLogin, accessToken,);
});

export const isUsernameTaken = asyncErrorHandler(async (req, res) => {
	const { username } = req.params;
	console.log('Username: ', username);
	if (!username)
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
	// return next(new CustomError(Message.InvalidInput, StatusCodes.BAD_REQUEST));
	const user = await userExists({ username });
	if (user)
		respond(res, StatusCodes.OK, Message.AlreadyExists, false);

	respond(res, StatusCodes.OK, Message.UsernameAvailable, true);
});

export const verifyAccount = asyncErrorHandler(async (req, res) => {
	const { token } = req.params;
	if (!token)
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
	// return next(new CustomError(Message.InvalidInput, StatusCodes.BAD_REQUEST));

	const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
	const user = await findUserByCustomQuery({
		confirmAccountToken: hashedToken,
		confirmAccountTokenExpiry: { $gt: Date.now() }
	}, { confirmAccountTokenExpiry: true, confirmAccountToken: true });

	if (!user)
		return respond(res, StatusCodes.OK, Message.AccountConfirmationError, false);
	if (user._id.toString() !== req.identity!.id)
		return respond(res, StatusCodes.FORBIDDEN, Message.NotAuthorized);

	user.confirmAccountToken = undefined;
	user.confirmAccountTokenExpiry = undefined;
	user.accountVerified = true;
	await user.save({ validateBeforeSave: false });

	respond(res, StatusCodes.OK, Message.SuccessUpdate, true);
});

// PRIVATE

/**
 * Sets the users credentials in cookies and redis
 */
async function tokenLoginUser(res: Response, userObj: UserResult) {
	const accessToken = signToken(userObj, { expiresIn: ACCESS_TOKEN_DURATION, algorithm: 'RS256' });
	const refreshToken = signToken(userObj, { expiresIn: REFRESH_TOKEN_DURATION, algorithm: 'RS256' });

	if (!accessToken || !refreshToken) {
		await rDel(userObj.id);
		return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.JWTError);
		// return next(new CustomError(Message.JWTError, StatusCodes.INTERNAL_SERVER_ERROR));
	}

	const isSet = await rSet(userObj.id, refreshToken, { EX: parseInt(REDIS_REFRESH_TOKEN_EXPIRY_TIME!) });
	if (isSet !== 'OK') {
		console.log('Redis error: ', isSet);
		return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, Message.DatabaseError);
		// return next(new CustomError(Message.DatabaseError, StatusCodes.INTERNAL_SERVER_ERROR, ));
	}

	const cookieOptions: CookieOptions = {
		maxAge: 2 * 60 * 60 * 1000, // 2h,
		// expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
		httpOnly: true,
		secure: false, // leave to false in development
		sameSite: 'none'
	};
	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

	res.cookie('accessToken', accessToken, cookieOptions);
	return accessToken;
}
