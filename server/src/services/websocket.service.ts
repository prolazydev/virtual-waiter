// /* eslint-disable @typescript-eslint/no-explicit-any */
// import type { Server } from 'http';
// import { WebSocketServer, WebSocket, type MyRawData } from 'ws';
// import { HEARTBEAT_INTERVAL, HEARTBEAT_VALUE } from '../utils/constants';
// import cookieParser from 'cookie-parser';

// import type { MyRequest } from '../types';
// import { Response, type NextFunction } from 'express';
// import { isAuthenticated } from '../middlewares/auth.middleware';
// import { isAuth } from './auth.service';

// // TODO: Implement the WebSocket service
// export const initSocketIO = async (app: Server) => {
// 	const wss = new WebSocketServer({ noServer: true });
// 	app.on('upgrade', (req, socket, head) => {
// 		// Handle Error from the http server
// 		socket.on('error', onSocketPreError);

// 		// console.log(req.headers);
// 		const url = new URL(req.url!, `http://${req.headers.host}`);
// 		const isStatistics = url.searchParams.get('isStatistics');
// 		if (isStatistics) {
// 			wss.handleUpgrade(req, socket, head, (ws) => {
// 				// socket.removeListener('error', onSocketPreError);
// 				wss.emit('connection', ws, req);
// 			});
// 			// Handle route for statistics
// 			return;
// 		}

// 		isAuthenticated(req as MyRequest, {} as Response, {} as NextFunction);

// 		// Perform Auth
// 		try {
// 			cookieParser('secret')(req as MyRequest, {} as Response, async () => {
// 				const accessToken = (req as MyRequest).cookies['accessToken'] ?? (req as MyRequest).signedCookies['accessToken'];
// 				const auth = await isAuth(accessToken);

// 				if (!auth) {
// 					socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
// 					socket.destroy();
// 					return;
// 				}

// 				wss.handleUpgrade(req, socket, head, (ws) => {
// 					// socket.removeListener('error', onSocketPreError);
// 					wss.emit('connection', ws, req);
// 				});
// 			});
	
// 		} catch (error) {
// 			socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
// 			socket.destroy();
// 			console.log(error);
// 			return;
// 		}
// 	});

// 	wss.on('connection', (ws) => {
// 		ws.isAlive = true;
// 		console.log('Connection Established');

// 		// Handle Error from the ws
// 		ws.on('error', onSocketPostError);

// 		ws.on('message', (data: MyRawData, isBinary) => {
// 			if ( isBinary && data.length === 1 && data[0] == parseInt(HEARTBEAT_VALUE) ) {
// 				console.log('PONG, Binary Data Received');
// 				ws.isAlive = true;
// 			} else
// 				wss.clients.forEach((client) => {
// 					// Send the data to all clients except the sender
// 					if (client !== ws && client.readyState === WebSocket.OPEN) {
// 						client.send(data, { binary: isBinary });
// 					}
// 				});
// 		});

// 		ws.on('close', () => {
// 			console.log('Connection Closed');
// 		});
// 	});

// 	wss.on('error', (error) => {
// 		console.error(`WebSocket Server Error: ${error}`);
// 	});

// 	wss.on('close', () => {
// 		console.log('Server Closed');

// 		clearInterval(interval);
// 	});

// 	const interval = setInterval(() => {
// 		wss.clients.forEach((clientWS) => {
// 			if (!clientWS.isAlive) 
// 				return clientWS.terminate();
			
// 			clientWS.isAlive = false;
// 			ping(clientWS);
// 		});
// 	}, parseInt(HEARTBEAT_INTERVAL) * 3);
// };

// // Private
// function onSocketPreError(err: Error) {
// 	console.error(err);
// }

// function onSocketPostError(err: Error) {
// 	console.error(err);
// }

// function ping(ws: WebSocket) {
// 	console.log('Pinging');
// 	ws.send(HEARTBEAT_VALUE, { binary: true });
// }

// // function isAuth(socket: Socket, next: (err?: Error | undefined) => void) {

// // }