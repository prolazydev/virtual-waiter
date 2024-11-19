import nodemailer from 'nodemailer';

import { SendEmailOptions } from '@/types';
import { MAILTRAP_HOST, MAILTRAP_PASSWORD, MAILTRAP_USERNAME } from '@/utils/constants';

export const sendEmail = async (options: SendEmailOptions) => {
	const emailOptions = {
		from: 'support@virtualwaiter.com',
		to: options.email,
		subject: `Virtual Waiter - ${options.subject}`,
		text: options.message,
	};

	// Correct way to create transporter instance
	const transporter = nodemailer.createTransport({
		host: MAILTRAP_HOST,
		// port: parseInt(MAILTRAP_PORT),
		port: 2525, // port 25 works sending email only once for some stupid reason
		auth: {
			user: MAILTRAP_USERNAME,
			pass: MAILTRAP_PASSWORD,
		}
	});
	try {
		const sentMail = await transporter.sendMail(emailOptions);
	
		console.log(sentMail);
	} catch (error) {
		console.log(error);
	}
};

