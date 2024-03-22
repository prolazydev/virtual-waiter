import { io } from 'socket.io-client';


// TODO: import url from .env
// TODO: implement socket.io-client
export const runSocket = () => {
	const socket = io('http://localhost:3000', {
		autoConnect: true,
	})

	return socket;
}