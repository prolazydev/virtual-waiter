import mongoose from 'mongoose';
import { IBusiness } from './Business';

const isDateRange = /^\d{2}:\d{2}-\d{2}:\d{2}$|^closed$|^24$/;

const hoursValidation = [ 
	{
		validator: function(this: { $__parent: IBusiness  }, dateRange: string) {
			// If is24 is true, closeHours should be empty or not assigned
			if (this.$__parent.is24) {
				return !dateRange || dateRange.trim() === '';
			} else
				return isDateRange.test(dateRange);
		}
	}
];

export const hours = new mongoose.Schema({
	monday: {
		type: String,
		required: false,
		validate: hoursValidation,
	},
	tuesday: {
		type: String,
		required: false,
		validate: hoursValidation,
	},
	wednesday: {
		type: String,
		required: false,
		validate: hoursValidation,
	},
	thursday: {
		type: String,
		required: false,
		validate: hoursValidation,
	},
	friday: {
		type: String,
		required: false,
		validate: hoursValidation,
	},
	saturday: {
		type: String,
		required: false,
		validate: hoursValidation,
	},
	sunday: {
		type: String,
		required: false,
		validate: hoursValidation,
	}
}, { _id: false });

export const cotactsSchema =  new mongoose.Schema({
	contactType: {
		type: String,
		required: true,
		enum: [ 'phone', 'email' ],
	},
	value: {
		type: String,
		required: true,
		// You can add validators here if needed
		// validate: [validator.isURL, 'Invalid URL!'], // Example validator
	},
}, { _id: false });

// hours.set('toJSON', {
// 	virtuals: true,
// 	transform: function(doc, ret) {
// 		delete ret._id;
// 	}
// });