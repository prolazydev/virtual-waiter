/* eslint-disable  @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express';
import { MyRequest } from '../../types';

export const requestHandler = <TRequest = any>(func: (req: MyRequest<TRequest>, res: Response, next: NextFunction) => Promise<any>) => 
	(req: MyRequest<TRequest>, res: Response, next: NextFunction) => 
		func(req, res, next).catch(err => next(err));
