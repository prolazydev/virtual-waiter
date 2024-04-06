import express from 'express';
import http from 'http';

import { PORT } from '../constants';
import mainRouting from '../../routes';
import { globalErrorHandler } from '../../controllers/error.controller';

const app = express();

export function createApp() {
	return app;
}

export function initServer() {
	const server = http.createServer(app);

	server.listen(PORT, () => 
		console.log(`Listening on port http://localhost:${PORT}/`)
	);

	handleMiscErrors(server);

	return server;
	// return app; 
}

export function handleMiscErrors(server: http.Server) {
	server.on('error', (err) => {
		console.log(`Server Error: ${err}`);
	});

	process.on('unhandledRejection', (err) => {
		console.log(err);
		console.log('Unhandled rejection occurred! Shutting down in 1 second...');

		setTimeout(() => 
			server.close(() => 
				process.exit(1)
			)
		, 1000);
	});
	

	process.on('uncaughtException', (err) => {
		console.log(err);
		console.log('Unhandled rejection occurred! Shutting down in 1 second...');

		setTimeout(() => 
			server.close(() => 
				process.exit(1)
			)
		, 1000);
	});

	process.on('SIGINT', () => {
		console.info(' Alright! Bye bye!');
		process.exit();
	});
}

/**
 * Initializes the routing for the application
 */
export function initRouting() {
	app.use('/api', mainRouting());

	// Must be the last middleware
	app.use(globalErrorHandler);
}
