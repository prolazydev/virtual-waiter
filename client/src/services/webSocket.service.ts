
let ws: WebSocket;
// TODO: Import from .env
const HEARTBEAT_TIMEOUT = (1000 * 6); // 6 seconds
const HEARTBEAT_VALUE = 1;

// TODO: import url from .env
// TODO: implement socket.io-client
export default () => {
	const runSocket = () => {
		if (ws) closeConnection();

		ws = new WebSocket('ws://localhost:4069?isStatistics=true', );

		ws.addEventListener('error', (event) => {
			console.log('websocket error: ', event);
		})

		ws.addEventListener('open', (event) => {
			console.log('websocket open: ', event);
		})

		ws.addEventListener('close', (event) => {
			console.log('websocket close: ', event);

			if (ws._pingTimeout) 
				clearTimeout(ws._pingTimeout);
		})

		ws.addEventListener('message', (e) => {
			if (isBinary(e.data)) {
				console.log('binary data: ', e.data);
				heartbeat();
				return;
			} else {

			}
			console.log('websocket message: ', e.data);
		})
	}

	const closeSocket = () => closeConnection();

	const sendMessage = (message: string) => {
		if (ws.readyState !== ws.OPEN) {
			console.log('socket is not open');
			return;
		} else if (!ws) {
			console.log('socket is not initialized');
			return;
		}
		ws.send(message);
	}

	return {
		runSocket,
		closeSocket,
		sendMessage
	}
}

function closeConnection() {
	ws.close();
}

function heartbeat() {
	// clearTimeout(ws.pingTimeout);
	if (!ws) 
		return;
	else if (ws._pingTimeout) 
		clearTimeout(ws._pingTimeout);	
	

	ws._pingTimeout = setTimeout(() => {
		ws.close();

		// logic to reconnect

	}, HEARTBEAT_TIMEOUT);

	const data = new Uint8Array(1);
	data[0] = HEARTBEAT_VALUE;

	ws.send(data);
}

function isBinary(data: any) {
	// return typeof data === 'object' 
	// 	&& Object.prototype.toString.call(data) === '[object Blob]';
	return data instanceof ArrayBuffer || data instanceof Blob;
}	

// export const runSocket = () => {
// 	const socket = io('http://localhost:3000', {
// 		autoConnect: true,
// 	})

// 	return socket;
// }