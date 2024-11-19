import mongoose, { InferSchemaType, Query, model } from 'mongoose';
import validator from 'validator';
import crypto from 'crypto';

import {  RestaurantModel } from '@/db/models/Restaurant';
import { hashPassword, randomSalt } from '@/utils/crypto';

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: false,
		validator: [ validator.isAlpha, 'Invalid first name' ],
	},
	lastName: { 
		type: String, 
		required: false, 
		validator: [ validator.isAlpha, 'Last name should only contain letters of the standard alphabet!' ],
	},
	username: {
		type: String, 
		required: [ true, 'Username is required!' ], 
		unique: true, 
		trim: true,
		minLength: [ 2, 'Username must have at least 2 characters!' ],
		maxLength: [ 30, 'Username cannot exceed 30 characters!' ], // Standard from Instagram
		validator: [ validator.isAlphanumeric, 'Invalid username' ],
		validate: {
			validator: function (value: string) {
				// Define a regular expression pattern that allows letters, numbers, underscores, and periods
				const usernameRegex = /^[a-zA-Z0-9_.]+$/;
				return usernameRegex.test(value);
			},
			message: 'Username can contain only letters, numbers, underscores, and periods.'
		},
	},
	email: { 
		type: String, 
		required: [ true, 'Email is required!' ], 
		unique: true, 
		validator: [ validator.isEmail, 'Invalid email!' ]
	},
	avatar: {
		type: Buffer,
		required: false, 
	},
	auth: {
		password: { 
			type: String, 
			required: [ true, 'Password is required!' ], 
			trim: true, 
			min: 8, 
			select: false // doesn't return password in any query
		},
		passwordChangedAt: {
			type: Date,
			required: false,
			default: undefined,
			select: false,
		},
		// May need to be not required
		salt: { 
			type: String, 
			required: true, 
			select: false 
		},
		roles: { 
			type: [ String ],
			enum: [ 'user', 'admin', 'chef' ],
			default: [ 'user' ],
			trim: true,
		},
	},
	deleted: { 
		type: Boolean, 
		required: false, 
		default: false, 
		select: false, 
	},
	blocked: {
		type: Boolean,
		required: false,
		default: false,
		select: false,
	},
	accountVerified: {
		type: Boolean,
		required: false,
		default: false,
		select: false,
	},
	confirmAccountToken: {
		type: String,
		required: false,
		default: undefined,
		select: false, 
	},
	confirmAccountTokenExpiry: {
		type: Date,
		required: false,
		default: undefined,
		select: false, 
	},
	passwordResetToken: {
		type: String,
		required: false,
		default: undefined,
		select: false, 
	},
	passwordResetTokenExpiry: {
		type: Date,
		required: false,
		default: undefined,
		select: false, 
	},
}, { timestamps: true, });

userSchema.methods.toAuthObj = function() {
	const user = this.toJSON();

	delete user.auth.password;
	delete user.auth.salt;
	delete user.createdAt;
	delete user.updatedAt;
	delete user.__v;

	return user;
};

userSchema.methods.createResetPasswordToken = function() {
	const resetToken = crypto.randomBytes(32 ).toString('hex');

	this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
	this.passwordResetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
	
	return resetToken;
};

userSchema.pre('save', async function (next) {	
	if (this.isNew || this.isModified('auth.password')) {
		const salt = randomSalt();		
		this.auth!.salt = salt;
		this.auth!.password = hashPassword(salt, this.auth!.password);
		this.auth!.passwordChangedAt = new Date(Date.now());

		// await this.save();
		next();
	}
	
	next();
});

// userSchema for update (soft deleting user and all related data)
userSchema.pre(/^(updateOne|findOneAndUpdate)/, async function (next) {
	const user = this as mongoose.FlatRecord<User>;
	// if (user.isNew)
	// 	return next();

	// if (!user.isModified('auth.password'))
	// 	return next();

	const salt = randomSalt();		
	user.auth!.salt = salt;
	user.auth!.password = hashPassword(salt, user.auth!.password);
	user.auth!.passwordChangedAt = new Date(Date.now());
	console.log('Changed password!');
	next();
	// if (update.password) {
	// 	// hash password
	// }

	// if () {
	// hash password

	// }

	next();
});

userSchema.pre(/^(find|findOne)/, function (next): void {
	// Global filter
	(this as Query<object, object>)
		.where({ deleted: false });

	next();
});


userSchema.pre(/^(deleteOne|findOneAndRemove|findOneAndDelete)/, { document: true, query: false }, async function (next) {
	// const user: any = this;
	// console.log(user);
	const user = this;

	const blogs = await RestaurantModel.find({ userId: user._id }).lean();
	console.log(blogs);

	// const blogs = await Blog.find({ userId: user._id }).lean();

	// console.log(blogs);

	next();
});

export type User = InferSchemaType<typeof userSchema>;
export const UserModel = model('Users', userSchema);
