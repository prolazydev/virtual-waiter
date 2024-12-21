// console.log('env');
// console.log();
// console.log(import.meta.env);

export const 
	SERVER_PORT = parseInt(import.meta.env.VITE_SERVER_PORT!) || 4420,
	HEARTBEAT_VALUE = parseInt(import.meta.env.VITE_HEARTBEAT_VALUE) || 1,
	HEARTBEAT_TIMEOUT = parseInt(import.meta.env.VITE_HEARTBEAT_TIMEOUT) || 6000
;
