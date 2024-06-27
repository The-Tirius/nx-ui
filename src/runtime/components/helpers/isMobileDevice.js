let result = null;

/**
 * Check if the device is mobile (phone, tablet)
 * @returns {boolean}
 */
export default function() {
	if (result === null)
		result = /Mobi|Android/i.test(navigator.userAgent);

	return result;
};