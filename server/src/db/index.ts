import mongoose from 'mongoose';
import { MONGODB_CONNECTION_URI } from '@/utils/constants';

export async function initDb() {
	try {
		await mongoose.connect(MONGODB_CONNECTION_URI);
		console.log('Connected to the database!');
	} catch (err) {
		// handle error code here
		console.error('Error connecting to the database!');
		console.error(err);
	}
}
