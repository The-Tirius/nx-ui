// function outSine(n) {
// 	return Math.sin(n * Math.PI / 2);
// };

// function inOutSine(n) {
// 	return .5 * (1 - Math.cos(Math.PI * n));
// };

// function outCube(n) {
// 	return --n * n * n + 1;
// };

// function outQuad(n){
// 	return n * (2 - n);
// };

// function outQuart(n) {
// 	return 1 - (--n * n * n * n);
// };

function inOutQuart(n) {
	n *= 2;
	if (n < 1) return 0.5 * n * n * n * n;
	return -0.5 * ((n -= 2) * n * n * n - 2);
};

/**
 * Animate value
 * @param {Function} callback 
 * @param {number} start 
 * @param {number} end 
 * @param {number} duration 
 * @example
 * 
 * animateValue((value) => {
 *     console.log('value', value);
 * }, 0, 100, 10000);
 */
export default function(callback, start, end, duration) {
	const fn = inOutQuart;
	let startTimestamp = null; 
	let val = start; 

	const step = (timestamp) => {
		if (!startTimestamp) startTimestamp = timestamp;

		const progress = fn(Math.min((timestamp - startTimestamp) / duration, 1));

		val = Math.floor(progress * (end - start) + start);
		callback(val);

		if (progress < 1) requestAnimationFrame(step);
	};

	requestAnimationFrame(step);
}