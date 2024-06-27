export default (s) => {
	const lines = s.split('\n');
	const first = (() => {
		for (let item of lines) {
			const code = item.replace(/[\n\t]/g, '');

			if (code.length)
				return item;
		}
	})();

	const output = [];
	let read = '	';
	let spacesToRemove = 0;

	while (read === '	') {
		read = first[spacesToRemove];

		if (read === '	') spacesToRemove++;
	}

	lines.forEach(line => output.push(line.substr(spacesToRemove)));

	return output.join('\n');
}