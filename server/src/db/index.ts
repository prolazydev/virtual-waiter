import mongoose from 'mongoose';
import { MONGODB_CONNECTION_URI } from '@/utils/constants';

const onlineURI = "mongodb+srv://flamurbiz:KKFzxxBHv9I4cEoI@virtual-waiter.povhb.mongodb.net/virtual-waiter?zlibCompressionLevel=3&retryReads=true&retryWrites=true";

export async function initDb() {
	try {
		if (process.env.ONLINE_MODE === 'on') {
			console.log('Connecting to the online database...');
			await mongoose.connect(onlineURI);
		} else {
			console.log('Connecting to the local database...');
			await mongoose.connect(MONGODB_CONNECTION_URI);
		}
		console.log('Connected to the database!');
	} catch (err) {
		// handle error code here
		console.error('Error connecting to the database!');
		console.error(err);
	}
}
