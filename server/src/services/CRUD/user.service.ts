import crypto from 'crypto';
import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';
import { User, UserModel } from '../../db/models/User';
import { mongoId } from '../../types';

// POST
export const createUser = async (userObj: User) => 
	new UserModel(userObj).save({ validateBeforeSave: true, validateModifiedOnly: true });

// GET
export const findUsers = async () => await UserModel.find();

export const findUserById = (id: mongoId) => UserModel.findById(id);
export const findUserByEmail = (email: string) => UserModel.findOne({ email });
export const findUserByUsername = (username: string) => UserModel.findOne({ username });
export const findUserBySessionToken = async (sessionToken: string) => await UserModel.findOne({ 'auth.sessionToken': sessionToken });

export const findUserByCustomQuery = (filter?: FilterQuery<User>, projection?: ProjectionType<User>, options?: QueryOptions<User>) => UserModel.findOne(filter, projection, options);
export const findUsersByCustomQuery = (filter: FilterQuery<User>, projection?: ProjectionType<User>, options?: QueryOptions<User>) => UserModel.find(filter, projection, options);

export const userExists = async (filter: FilterQuery<User>) => UserModel.exists(filter);

// PATCH
export const updateUserById = async (id: mongoId, values: Partial<User>) => 
	await UserModel.findByIdAndUpdate(id, values, { new: true, runValidators: true });
// export const updateUserPassword = async (id: mongoId, newPassword: string) => 
// 	await UserModel.findByIdAndUpdate(id, { 'auth.password': newPassword });

// DELETE
export const deleteUserById = async (id: mongoId) => 
	UserModel.findByIdAndUpdate(id, { 'deleted': true }, { new: true, runValidators: true });


export const createResetPasswordToken = (user: User) => {
	const resetToken = crypto.randomBytes(32 ).toString('hex');

	user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
	user.passwordResetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
	
	return resetToken;
};

export const createConfirmAccountToken = (user: User) => {
	const confirmToken = crypto.randomBytes(32 ).toString('hex');

	user.confirmAccountToken = crypto.createHash('sha256').update(confirmToken).digest('hex');
	user.confirmAccountTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
	
	return confirmToken;
};