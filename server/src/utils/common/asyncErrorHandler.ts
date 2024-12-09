/* eslint-disable  @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express';
import { type ParamsDictionary } from 'express-serve-static-core';
import { MyRequest } from '../../types';

export const requestHandler = <TRequest = any, TItem = any, TParams extends ParamsDictionary = any>(func: (req: MyRequest<TRequest, TItem, TParams>, res: Response, next: NextFunction, ...args: any) => Promise<any>) => 
	(req: MyRequest<TRequest, TItem, TParams>, res: Response, next: NextFunction, ...args: any) => 
		func(req, res, next, ...args).catch(err => next(err));
