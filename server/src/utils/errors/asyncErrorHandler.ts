/* eslint-disable  @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express';
import { MyRequest } from '../../types';

export const requestHandler = <TRequest = any, TItem = any>(func: (req: MyRequest<TRequest, TItem>, res: Response, next: NextFunction, ...args: any) => Promise<any>) => 
	(req: MyRequest<TRequest, TItem>, res: Response, next: NextFunction, ...args: any) => 
		func(req, res, next, ...args).catch(err => next(err));
