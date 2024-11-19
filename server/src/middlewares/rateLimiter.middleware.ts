import { rateLimit } from 'express-rate-limit';

// TODO: maybe introduce .env constants?
export const rateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 10000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	message: 'Too many requests from this IP, please try again after 15 minutes', // Message to send
	// store: ... , // Use an external store for more precise rate limiting
});
