import winston from 'winston';

const logFormat = winston.format.printf(
	(info) => {
		return `${info.timestamp} [${info}] - ${info.message}`;
	});

// Define custom log levels
const customLevels = {
	error: 0,
	warn: 1,
	info: 2,
	debug: 3,
	seed_info: 4, // Custom log level
};

export const logger = winston.createLogger({
	levels: customLevels,
	level: 'debug',
	format: winston.format.combine(
		winston.format.timestamp({ format: 'HH:mm:ss' }),
		logFormat
	),
	transports: [
		// Write all logs with importance level of `SEED_INFO`
		new winston.transports.File({ filename: './LOGS/seed.log', level: 'seed_info' }),
		// new winston.transports.Console(),
	]
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}