import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export const 
	PORT = parseInt(process.env.PORT!) || 3000,
	MONGODB_CONNECTION_URI = process.env.MONGODB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/virtual-waiter',

	SECRET = process.env.SECRET || '',
	SECRET_JWT = process.env.SECRET_JWT || '',
	SECRET_REFRESH_JWT = process.env.SECRET_REFRESH_JWT || '',

	ACCESS_TOKEN_DURATION = process.env.ACCESS_TOKEN_DURATION || '1h',
	REFRESH_TOKEN_DURATION = process.env.REFRESH_TOKEN_DURATION || '30d',
	/** 30 days */
	REDIS_REFRESH_TOKEN_EXPIRY_TIME = process.env.REDIS_REFRESH_TOKEN_EXPIRY_TIME_IN_S, 

	TEST_SECRET_PRIVATE_JWT = process.env.TEST_SECRET_PRIVATE_JWT || '',
	TEST_SECRET_PUBLIC_JWT = process.env.TEST_SECRET_PUBLIC_JWT || '',

	CACHE_DURATION_IN_S = process.env.CACHE_DURATION_IN_S || '',

	NODE_ENV = process.env.NODE_ENV || 'development',
	MAILTRAP_USERNAME = process.env.MAILTRAP_USERNAME,
	MAILTRAP_PASSWORD = process.env.MAILTRAP_PASSWORD,
	MAILTRAP_HOST = process.env.MAILTRAP_HOST,
	MAILTRAP_PORT = process.env.MAILTRAP_PORT;
	