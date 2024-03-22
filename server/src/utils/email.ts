import nodemailer from 'nodemailer';
import { MAILTRAP_HOST, MAILTRAP_PASSWORD, MAILTRAP_PORT, MAILTRAP_USERNAME } from './constants';
import { SendEmailOptions } from '../types';

export const sendEmail = async (options: SendEmailOptions) => {
	const transporter = nodemailer.createTransport({ 
		host: MAILTRAP_HOST,
		port: parseInt(MAILTRAP_PORT),
		auth: {
			user: MAILTRAP_USERNAME,
			pass: MAILTRAP_PASSWORD,
		}
	});


	const emailOptions = {
		from: 'Virtual Waiter <support@virtualwaiter.com>',
		to: options.email,
		subject: options.subject,
		text: options.message,
	};
	const sentMail = await transporter.sendMail(emailOptions);

	console.log(sentMail);
};

