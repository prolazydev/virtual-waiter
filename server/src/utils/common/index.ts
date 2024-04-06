
/**
 * Convert a date to a cron expression
 * @param {DATE} date The date to convert
 */
export function dateToCronExpression(date: Date) {
	const minutes = date.getMinutes();
	const hours = date.getHours();
	const day = date.getDate();
	const month = date.getMonth() + 1; // Months are zero-based
	// const year = date.getFullYear();
  
	return `${minutes} ${hours} ${day} ${month} *`; // Run every minute at the specified date and time
}


export function isEmptyObject<TObject>(obj: TObject) {
	for (const key in obj) 
		if (Object.prototype.hasOwnProperty.call(obj, key)) 
			return false; // Object has at least one property, so it's not empty


	return true; // Object has no own properties, so it's empty
}

export function regexFuzzySearch(text: string) {
	const regex = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
	
	return new RegExp('^' + regex, 'gi');
}

// PRIVATE
// function escapeRegex(text: string) {
// 	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
// }

// function isDataEmpty<TData = null>(data: TData | null = null) {
// 	return data === null || data === undefined || data === '';
// }

// TODO: maybe implement a mail service
// export function mail(to: string, subject: string, html: string) {
// const msg = {
// 	to,
// 	from: process.env.EMAIL_USER,
// 	subject,
// 	html,
// };
// sgMail.send(msg);
// }
