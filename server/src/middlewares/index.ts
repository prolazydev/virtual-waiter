import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import sanitize from 'express-mongo-sanitize';
import { xss } from 'express-xss-sanitizer';
import hpp from 'hpp';
import cors, { type CorsOptions } from 'cors';

import { rateLimiter } from '@/middlewares/rateLimiter.middleware';

const allowedDynamicDomain = /^https:\/\/stunning-palm-tree-.*\.app\.github\.dev$/;

const allowedOrigins = [
	'https://stunning-palm-tree-xpj9j4jwg662vw7q-5173.app.github.dev',
	'http://stunning-palm-tree-xpj9j4jwg662vw7q-5173.app.github.dev',
	'http://localhost:5173', // Add your localhost app here
	'https://stunning-palm-tree-xpj9j4jwg662vw7q.github.dev/',
	'http://stunning-palm-tree-xpj9j4jwg662vw7q.github.dev/',
	'https://stunning-palm-tree-xpj9j4jwg662vw7q-5173.app.github.dev/',
	'http://stunning-palm-tree-xpj9j4jwg662vw7q-5173.app.github.dev/'
];

const CORSOptions: CorsOptions  = {
	origin: (origin, callback) => {
		if (
			!origin || // Allow requests without an origin (like Postman or cURL)
			allowedOrigins.includes(origin) || // Check explicit origins
			allowedDynamicDomain.test(origin) // Check dynamic subdomains
		) {
			callback(null, true); // Allow the request
		} else {
			callback(new Error('Not allowed by CORS')); // Block the request
		}
	},
  
	// origin: [ 'http://localhost:5173', 'https://stunning-palm-tree-xpj9j4jwg662vw7q-5173.app.github.dev/'],
	// methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],

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
	app.get('/health', (req, res) => {
		res.status(200).send('Server is running!');
	});
	
	app.use((req, res, next) => {
		console.log('Request Origin:', req.headers.origin);
		next();
	});
	
	app.use(morgan('dev'));
	
	app.use(cors(CORSOptions));

	app.use(helmet());
    
	// app.use('/api', rateLimiter);
	
	app.use(express.json({ limit: '5mb' }));
	app.use(sanitize()); // Sanitize data after body parsing
	
	app.use(xss(XSSOptions));
	app.use(hpp(HPPOptions));
	
	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser('secret'));
}