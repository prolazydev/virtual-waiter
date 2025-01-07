import { createClient, RedisClientType, SetOptions } from 'redis';

console.log('online mode:', process.env.ONLINE_MODE)

let retries = 1;
const maxRetries = 1000;
let redisClient: RedisClientType;

if (process.env.ONLINE_MODE === 'on') {
	console.log('Using online Redis Client');
	redisClient = createClient({
		username: 'default',
		password: 'ZMbhzhEdNw6EPzZEtTjBrbsc3t7baZfw',
		socket: {
			host: 'redis-13720.c250.eu-central-1-1.ec2.redns.redis-cloud.com',
			port: 13720
		}
	});
} else {
	console.log('Using local Redis Client');
	redisClient = createClient();
}

redisClient.on('error', async (err) => {
	try {
		console.error('Redis Error: ', err.code);
		console.log(`Redis Retying to connect... Attempt ${retries}`);

		if (retries === maxRetries) {
			await redisClient.disconnect();

			console.info('Redis Client disconnected!');
			console.info(`Redis retried to connect ${retries} times before disconnecting the Client!`);
		}
		retries++;
	} catch (err) {
		console.error('Error occurred while closing Redis connection:', err);
	}
});

redisClient.on('connect', () => {
	console.info('Redis Client connected to server!');
});

export async function initRedis() {
	await redisClient.connect();
}

// TODO: Log actions to database
export const rSet = async (key: string, value: string, options: SetOptions = {}) => 
	redisClient.set(key, value, options);

export const rGet = async (key: string) => 
	redisClient.get(key);

export const rDel = async (key: string) => 
	redisClient.del(key);

export const rExists = async (key: string) =>
	redisClient.exists(key);
