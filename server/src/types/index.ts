/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { RequestHandler, 
	// ParamsDictionary, 
	Query } from 'express-serve-static-core';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';

export type middlewareRequest = RequestHandler[] | RequestHandler;

export interface MyJwtPayload extends JwtPayload {
	/**
	 * User Id
	 */
	id: string | undefined;
	username: string,
	email: string,
	avatar?: string,
	roles?: string[];
}

export interface UserResult {
	id: string,
	username: string,
	email: string,
	avatar?: string,
	roles?: string[]
}

/**
 * Custom Express Request
 */
// export interface MyRequest<TBody = any, TQuery extends Query = any> extends Express.Request {
// eslint-disable-next-line  @typescript-eslint/no-unused-vars
export interface MyRequest<TBody = any, TQuery extends Query = any> extends Request {
	body: TBody,
	// query: TQuery;
	cookies: any,
	// params: ParamsDictionary,
	identity?: UserResult,
	headers: any,
}

/**
 * Custom Express Response
 */
export type RequestResult<TModel = undefined> = {
	status: 'success' | 'error',
	data?: TModel
	msg?: string
}

/**
 * Custom Express Request
 */
export interface LoginRequest {
	email: string,
	password: string,
}
export interface LoginWithUsernameRequest {
	username: string,
	password: string,
}

/**
 * Custom Express Request
 */
export interface RegisterRequest {
	username: string,
	email: string,
	password: string,
	confirmPassword: string,
	becomeChef: boolean,
}

export interface UpdatePasswordRequest {
	oldPassword: string,
	newPassword: string,
	confirmNewPassword: string,
}

export type mongoId = string | mongoose.Types.ObjectId | mongoose.Schema.Types.ObjectId;

export type SendEmailOptions = {
	email: string,
	subject: string,
	message: string,
}