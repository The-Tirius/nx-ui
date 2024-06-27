import defaultStyle from '../default.style';

export default (options: {}) => {
	let result = ':root {';

	const userStyle = options?.style ? options.style : {};

	for (let key in userStyle) {
		if (key in defaultStyle)
			defaultStyle[key] = userStyle[key];
		else
			console.error(`UI: Unknown css variable defined in ui config "${key}"`);
	}

	for (let key in defaultStyle) {
		result += `--ui-${key}:${defaultStyle[key]};`;
	}

	result += '}'
	
	return result;
}