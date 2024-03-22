declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string,
			MONGODB_CONNECTION_STRING: string,
			SECRET: string,
			SECRET_JWT: string,
			SECRET_REFRESH_JWT: string,
			CACHE_DURATION_IN_S: string,
			NODE_ENV: 'development' | 'production',

			UV_THREADPOOL_SIZE: string,


			TEST_SECRET_PRIVATE_JWT: string,
			TEST_SECRET_PUBLIC_JWT: string,

			ACCESS_TOKEN_DURATION: string,
			REFRESH_TOKEN_DURATION: string,
			REDIS_REFRESH_TOKEN_EXPIRY_TIME_IN_S: string,

			MAILTRAP_USERNAME: string,
			MAILTRAP_PASSWORD: string,
			MAILTRAP_HOST: string,
			MAILTRAP_PORT: string,
		}
	}
}

export { };
