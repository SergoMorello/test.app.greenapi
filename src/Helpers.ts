/**
 * Show time in components
 * @param timestamp Date timestamp
 * @returns String time 00:00
 */
export const showTime = (timestamp?: number): string => {
	const date = typeof timestamp === 'number' ? new Date(timestamp * 1000) : new Date();
	return String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
};

/**
 * Cute text if more limit
 * @param {string} text Text for cute
 * @param {number} size Length string limit
 * @param {boolean} removeBreaks If true remove break line in string, default true
 * @returns {string} Cutted string
 */
export const cuteText = (text: string, size: number = 100, removeBreaks: boolean = true): string => {
	var result = '';
	var newTextLen = size;
	text = removeBreaks ? text.replace(/\s+/g, ' ') : text;
	const textLen = text.length;

	var lineBreakTimer = 0;
	for(var i = 0; i < textLen; i++) {
		newTextLen = size + i;
		const nextVal = textLen > newTextLen ? text[newTextLen] : text[textLen - 1];
		if (textLen < newTextLen || nextVal === ' ' || lineBreakTimer >= (size + (size * 0.1))) {
			break;
		}
		if (nextVal === ')') {
			++newTextLen;
			break;
		}
		++lineBreakTimer;
	}
	
	result = text.substring(0, newTextLen);
	if (textLen > newTextLen) {
		result += '...';
	}
	return result;
};