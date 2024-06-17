import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { findUserById, findUsers, deleteUserById, updateUserById, findUserByUsername } from '../services/CRUD/user.service.js';
import { Message } from '../utils/common/ServerResponseMessages.js';
import { requestHandler } from '../utils/errors/asyncErrorHandler.js';
import { compressImageWebp } from '../utils/compression/index.js';
import { respond } from '../utils/common/http';

export const getAllUsers = requestHandler(async (req, res) => {
	const users = await findUsers();

	respond(res, StatusCodes.OK, Message.SuccessRead, users);
});

export const getUserMe = requestHandler(async (req, res) => {
	const id = req.identity!.id;

	if ( !id )
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
		// return next(new CustomError(Message.InvalidInput, StatusCodes.BAD_REQUEST));

	const user = await findUserById(id);
	if ( !user ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
		// return next(new CustomError(Message.NotFound, StatusCodes.NOT_FOUND));

	respond(res, StatusCodes.OK, Message.SuccessRead, user);
});

export const getUserById = requestHandler(async (req, res) => {
	const id = req.params.id;
	if ( !id ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
		// return next(new CustomError(Message.InvalidInput, StatusCodes.BAD_REQUEST));
	const user = await findUserById(id);
	if ( !user ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
		// return next(new CustomError(Message.NotFound, StatusCodes.NOT_FOUND));

	respond(res, StatusCodes.OK, Message.SuccessRead, user);
});

export const getUserByUsername = requestHandler(async (req, res) => {
	const username = req.params.username;
	if ( !username ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
		// return next(new CustomError(Message.InvalidInput, StatusCodes.BAD_REQUEST));
	const user = await findUserByUsername(username);
	if ( !user ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
		// return next(new CustomError(Message.NotFound, StatusCodes.NOT_FOUND));

	respond(res, StatusCodes.OK, Message.SuccessRead, user);
});

export const updateUser = requestHandler(async (req, res) => {
	// TODO: update only allowed props
	const id = req.params.id;
	if ( !id ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
		// return next(new CustomError(Message.InvalidInput, StatusCodes.BAD_REQUEST));
	const user = await updateUserById(id, req.body);
	if ( !user ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
		// return next(new CustomError(Message.NotFound, StatusCodes.NOT_FOUND));

	respond(res, StatusCodes.OK, Message.SuccessUpdate, user);
});

export const updateUserAvatar = requestHandler(async (req, res) => {
	if ( !req.file )
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
		// return next(new CustomError(Message.InvalidInput, StatusCodes.BAD_REQUEST));
	
	const id = new mongoose.Types.ObjectId(req.params.id);
	const compressedImage = await compressImageWebp(req.file.buffer);

	const user = await updateUserById(id, { avatar: compressedImage });
	if ( !user ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
		// return next(new CustomError(Message.NotFound, StatusCodes.NOT_FOUND));
	
	// TODO: choose between sending the compressed image or the user object
	respond(res, StatusCodes.OK, '', Message.SuccessUpdate);
});

export const deleteUser = requestHandler(async (req, res) => {
	const id = req.identity!.id;
	if ( !id ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
		// return next(new CustomError(Message.InvalidInput, StatusCodes.BAD_REQUEST));
	const user = await deleteUserById(id);
	if ( !user )
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
		// return next(new CustomError(Message.NotFound, StatusCodes.NOT_FOUND));

	respond(res, StatusCodes.OK, '', Message.SuccessDelete);
});

export const deleteSelf = requestHandler(async (req, res) => {
	const id = req.identity!.id;
	if ( !id ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const user = await deleteUserById(id);
	if ( !user )
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
		// return next(new CustomError(Message.NotFound, StatusCodes.NOT_FOUND));

	respond(res, StatusCodes.OK, '', Message.SuccessDelete);
});