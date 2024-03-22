import mongoose, { model, type InferSchemaType } from 'mongoose';
import validator from 'validator';

const requestSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	name: {
		type: String,
		required: true,
		validator: [ validator.isAlpha, 'Invalid name' ],
	},
	status: {
		type: String,
		required: true,
		enum: [ 'Not_Made', 'Received', 'Approved', 'Rejected', 'Repeated', 'Blocked', 'Role_Restricted' ],
		default: 'pending',
	},
	repeated: {
		type: Number,
		default: 0,
		select: 0,
	},
}, { timestamps: true });

export type Request = InferSchemaType<typeof requestSchema>;
export const RequestModel = model('Requests', requestSchema);
