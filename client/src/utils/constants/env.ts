export const 
	ONLINE_MODE = import.meta.env.VITE_ONLINE_MODE || 'off',
	SERVER_PORT = parseInt(import.meta.env.VITE_SERVER_PORT!) || 4420,
	API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4420/api/',
	MODE = import.meta.env.MODE,
	HEARTBEAT_VALUE = parseInt(import.meta.env.VITE_HEARTBEAT_VALUE) || 1,
	HEARTBEAT_TIMEOUT = parseInt(import.meta.env.VITE_HEARTBEAT_TIMEOUT) || 6000
;
