/* eslint-disable  @typescript-eslint/no-explicit-any */
import redis, { SetOptions } from 'redis';

let retries = 1;
const maxRetries = 1000;
const redisClient = redis.createClient();

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

export const rSet = async (key: string, value: string, options: SetOptions = {}) => 
	redisClient.set(key, value, options);

export const rGet = async (key: string) => 
	redisClient.get(key);

export const rDel = async (key: string) => 
	redisClient.del(key);

export const rExists = async (key: string) =>
	redisClient.exists(key);
