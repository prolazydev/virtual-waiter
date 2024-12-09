import express from 'express';
import http from 'http';

import { PORT } from '@/utils/constants';
import mainRouting from '@/routes';
import { globalErrorHandler } from '@/controllers/error.controller';

const app = express();

export const createApp = () => app;
// export function createApp() {
// 	return app;
// }

export function initServer() {
	const server = http.createServer(app);

	server.listen(PORT, '0.0.0.0', () => 
		console.log(`Listening on port http://localhost:${PORT}/`)
	);

	handleMiscErrors(server);

	return server;
}
// TODO: implement messages as constants
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
	const router = express.Router();

	app.use('/api', mainRouting(router));

	// TODO: Move this to a separate file
	app.use('/api/test/static', (req, res) => res.send({ message: 'Test response' }));
	app.get('/api/test/dynamic', (req, res) => {
		const result = Array.from(
			{ length: 100000 }, 
			(_, i) => i * 2)
			.reduce((acc, curr) => acc + curr, 0);

		res.send({ result });
	});

	// Must be the last middleware
	app.use(globalErrorHandler);
}
