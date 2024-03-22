import { Server } from 'socket.io';

// TODO: Implement the WebSocket service
export const initIO = async () => {
	const io = new Server(3000, {
		cors: {
			origin: 'http://localhost:5173',
			// methods: [ 'GET', 'POST' ],
			credentials: true,
		},
	});

	io.on('connection', (socket) => {
		console.log('User connected: ', socket.id);
		socket.on('disconnect', () => {
			console.log('user disconnected');
		});
	});
	
};