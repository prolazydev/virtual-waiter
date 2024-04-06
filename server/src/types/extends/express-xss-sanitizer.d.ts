declare module 'express-xss-sanitizer' {
	import type { NextFunction } from 'express';

	export function xss(options: object): NextFunction;
}