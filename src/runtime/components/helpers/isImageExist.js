/**
 * Check if image exist
 * @param {string} url - image url (local or remote)
 * @returns {boolean}
 */
export default function(url) {
	return new Promise((resolve) => {
		const image = new Image;

		image.onload = function() {
			resolve(this.width > 1 && this.height > 1);
		};

		image.onerror = () => {
			resolve(false);
		}

		image.src = url;
	});
}