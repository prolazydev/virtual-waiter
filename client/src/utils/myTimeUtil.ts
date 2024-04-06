const defaultDateTimeFormatOptions: Intl.DateTimeFormatOptions = { 
	hour: 'numeric', 
	hour12: true, 
	minute: 'numeric' 
}

export default () => {
	const toHourMinute = (date: Date, DateTimeFormatOptions: Intl.DateTimeFormatOptions = defaultDateTimeFormatOptions) => {
		return date.toLocaleTimeString('en-US', DateTimeFormatOptions)
	}

	/**
	 * Get the time value in minutes
	 * @param date 
	 */
	const getTimeValue = (businessHour: string) => {
		const [hoursString, minutesString] = businessHour.split(':');
		const hours = parseInt(hoursString, 10);
		const minutes = parseInt(minutesString, 10);
		return hours * 60 + minutes;
		// return date.getHours() * 60 + date.getMinutes();
	}


	return {
		toHourMinute,
		getTimeValue,
	}
} 