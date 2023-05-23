/**
 * Show time in components
 * @param timestamp Date timestamp
 * @returns String time 00:00
 */
export const showTime = (timestamp?: number): string => {
	const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date();
	return String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
};