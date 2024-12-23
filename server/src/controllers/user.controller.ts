import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { Message } from '@/utils/common/ServerResponseMessages.js';
import { requestHandler } from '@/utils/common/asyncErrorHandler.js';
import { compressImageWebp as compressImageToWEBP } from '@/utils/compression/index.js';
import { respond } from '@/utils/common/http';

import { findUserById, findUsers, deleteUserById, updateUserById, findUserByUsername } from '@/services/CRUD/user.service.js';
import type { AllowedUpdateProps } from '@/types/business/common';

export const getAllUsers = requestHandler(async (req, res) => {
	const users = await findUsers();

	respond(res, StatusCodes.OK, Message.SuccessRead, users);
});

export const getUserMe = requestHandler(async (req, res) => {
	const id = req.identity!.id;
	if ( !id )
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const user = await findUserById(id);
	if ( !user ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessRead, user);
});

export const getUserById = requestHandler(async (req, res) => {
	const id = req.params.id;
	if ( !id ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const user = await findUserById(id);
	if ( !user ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessRead, user);
});

export const getUserByUsername = requestHandler(async (req, res) => {
	const username = req.params.username;
	if ( !username ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const user = await findUserByUsername(username);
	if ( !user ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessRead, user);
});

export const updateUser = requestHandler(async (req, res) => {
	const allowedProps: (keyof AllowedUpdateProps)[] = ['name', 'email', 'phone', 'address'];
	
	const updates: AllowedUpdateProps = Object.keys(req.body)
		.filter((key): key is keyof AllowedUpdateProps => allowedProps.includes(key as keyof AllowedUpdateProps))
		.reduce((obj, key) => {
			obj[key] = req.body[key];
			return obj;
		}, {} as AllowedUpdateProps);

	const id = req.params.id;
	if ( !id ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const user = await updateUserById(id, updates);
	if ( !user ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, Message.SuccessUpdate, user);
});

export const updateUserAvatar = requestHandler(async (req, res) => {
	if ( !req.file )
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
	
	const id = new mongoose.Schema.Types.ObjectId(req.params.id);
	const compressedImage = await compressImageToWEBP(req.file.buffer);

	const user = await updateUserById(id, { avatar: compressedImage });
	if ( !user ) 
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
	
	// TODO: return the compressed image
	respond(res, StatusCodes.OK, '', Message.SuccessUpdate, { avatar: user.avatar });
});

export const deleteUser = requestHandler(async (req, res) => {
	const id = req.identity!.id;
	if ( !id ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const user = await deleteUserById(id);
	if ( !user )
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, '', Message.SuccessDelete);
});

export const deleteSelf = requestHandler(async (req, res) => {
	const id = req.identity!.id;
	if ( !id ) 
		return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

	const user = await deleteUserById(id);
	if ( !user )
		return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

	respond(res, StatusCodes.OK, '', Message.SuccessDelete);
});