let result = null;

/**
 * Check if the browser is WebKit
 * @returns {boolean}
 */
export default function() {
	if (result === null)
		result = /webkit/.test( navigator.userAgent.toLowerCase() );

	return result;
}