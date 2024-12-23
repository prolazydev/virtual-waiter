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

/**
 * Merges two objects
 * @param defaultObj Initial object
 * @param mergingObj Merging object
 * @returns Merged object
 * @throws {Error} If the merging object contains mismatched properties
 */
export const mergeSameObjects = (defaultObj: object, mergingObj: object) => {
	const merged = { ...defaultObj };

	// TODO: Add property validation, if the mergingObj contains 1 or more mismatched properties, throw an error
	const defaultKeys = Object.keys(defaultObj);
	const mergingKeys = Object.keys(mergingObj);
	const diff = defaultKeys.filter(key => !mergingKeys.includes(key));
	if (diff.length > 0) 
		throw new Error(`Merging object contains mismatched properties: ${diff.join(', ')}`);	
	
	for (const key in mergingObj) 
		if (Object.prototype.hasOwnProperty.call(mergingObj, key)) 
			// @ts-expect-error typing issue
			merged[key] = mergingObj[key];

	return merged;
};

/**
 * Merges two objects of the same type
 * @param defaultObj Initial object
 * @param mergingObj Merging object
 * @returns Merged object
 * @throws {Error} If the merging object contains mismatched properties
 */
export const mergeSameTypedObjects = <TObject extends object>(defaultObj: TObject, mergingObj: TObject) => {
	const merged = { ...defaultObj };

	const defaultKeys = Object.keys(defaultObj);
	const mergingKeys = Object.keys(mergingObj);
	const diff = defaultKeys.filter(key => !mergingKeys.includes(key));
	if (diff.length > 0) 
		throw new Error(`Merging object contains mismatched properties: ${diff.join(', ')}`);

	for (const key in mergingObj)
		if (Object.prototype.hasOwnProperty.call(mergingObj, key)) 
			merged[key] = mergingObj[key];

	return merged;
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
