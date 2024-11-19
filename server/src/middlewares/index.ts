import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import sanitize from 'express-mongo-sanitize';
import { xss } from 'express-xss-sanitizer';
import hpp from 'hpp';
import cors, { type CorsOptions } from 'cors';

import { rateLimiter } from '@/middlewares/rateLimiter.middleware';

const CORSOptions: CorsOptions  = {
	origin: 'http://localhost:5173',
	// allowedHeaders: [ '*' ],
	// methods: [ '*' ],
	// exposedHeaders: [ 'Content-Length', 'X-Kuma-Revision' ],
	// maxAge: 600,
	credentials: true,
};

const XSSOptions = {
	allowedKeys: [ 'name' ],
	allowedAttributes: { input: [ 'value' ] }
};
// TODO: add more options
const HPPOptions: hpp.Options = { whitelist: [ 'name' ], };
 
export function initMiddlewares(app: Express) {
	app.use(morgan('dev'));

	app.use(cors(CORSOptions));
	app.use(helmet());
    
	app.use('/api', rateLimiter);

	app.use(express.json({ limit: '5mb' }));
	app.use(sanitize()); // Sanitize data after body parsing
	
	app.use(xss(XSSOptions));
	app.use(hpp(HPPOptions));

	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser('secret'));

	// TODO: caching
}
