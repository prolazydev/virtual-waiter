// console.log('env');
// console.log();
// console.log(import.meta.env);

export const 
	SERVER_PORT = parseInt(import.meta.env.VITE_SERVER_PORT!) || 4420;
