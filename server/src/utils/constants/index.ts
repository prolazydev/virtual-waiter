import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export const 
	NODE_ENV = process.env.NODE_ENV || 'development',
	PORT = parseInt(process.env.PORT!) || 3000,
	MONGODB_CONNECTION_URI = process.env.MONGODB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/virtual-waiter',

	SECRET = process.env.SECRET || '',
	SECRET_JWT = process.env.SECRET_JWT || '',
	SECRET_REFRESH_JWT = process.env.SECRET_REFRESH_JWT || '',

	/** 5m */
	ACCESS_TOKEN_DURATION = process.env.ACCESS_TOKEN_DURATION || '5m',
	/** 1d */
	REFRESH_TOKEN_DURATION = process.env.REFRESH_TOKEN_DURATION || '1d',
	/** 1h */
	ACCESS_TOKEN_DURATION_EXTENDED = process.env.ACCESS_TOKEN_DURATION_EXTENDED || '1h',
	/** 90d */
	REFRESH_TOKEN_DURATION_EXTENDED = process.env.REFRESH_TOKEN_DURATION_EXTENDED || '90d',
	
	/** 30d */
	REDIS_REFRESH_TOKEN_EXPIRY_TIME = process.env.REDIS_REFRESH_TOKEN_EXPIRY_TIME_IN_S, 
	/** 90d */
	REDIS_REFRESH_TOKEN_EXPIRY_TIME_EXTENDED = process.env.REDIS_REFRESH_TOKEN_EXPIRY_TIME_IN_S_EXTENDED,

	TEST_SECRET_PRIVATE_JWT = process.env.TEST_SECRET_PRIVATE_JWT || '',
	TEST_SECRET_PUBLIC_JWT = process.env.TEST_SECRET_PUBLIC_JWT || '',

	CACHE_DURATION_IN_S = process.env.CACHE_DURATION_IN_S || '',

	FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173',

	MAILTRAP_USERNAME = process.env.MAILTRAP_USERNAME,
	MAILTRAP_PASSWORD = process.env.MAILTRAP_PASSWORD,
	/** sandbox.smtp.mailtrap.io */
	MAILTRAP_HOST = process.env.MAILTRAP_HOST,
	/** 25 */
	MAILTRAP_PORT = process.env.MAILTRAP_PORT,
	
	HEARTBEAT_INTERVAL = process.env.HEARTBEAT_INTERVAL,
	HEARTBEAT_VALUE = process.env.HEARTBEAT_VALUE;
	