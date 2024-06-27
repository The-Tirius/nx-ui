/**
 * Return event coordinates relative to element
 * @param {Event} e - event
 * @param {null|HTMLElement} target - you can use specific target element instead of e.target
 * @returns {boolean}
 */
export default function(e, target = null) {
	if (target === null) target = e.target;

	const box = target.getBoundingClientRect();

	return {
		x: e.clientX - box.left,
		y: e.clientY - box.top
	};
}