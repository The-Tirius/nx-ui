import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (options = {}) => {
	const dirComponents = path.resolve(__dirname, '../runtime/components/');
	const result = {};

	// Get components props.json files
	let files = fs.readdirSync(dirComponents, { recursive: true  });

	files = files.filter(v => v.indexOf('props.json') !== -1);

	// Generate result array
	for (let file of files) {
		const componentName = file.split('\\')[0];
		const propsJSON = fs.readFileSync(path.resolve(dirComponents, file), { encoding: 'utf-8' });
		const props = JSON.parse(propsJSON);
		
		result[componentName] = props;
	}

	// If user defined props for components
	if (options?.componentsProps) {

		// Iterate components
		for (let componentName in options.componentsProps) {

			// If user defined props for component that does not exist
			if (!(componentName in result)) {
				console.error(`Reading user defined components props error: component "${componentName}" does not exist`);
				continue;
			}

			// Save user defined props to const
			const userDefinedProps = options.componentsProps[componentName];

			// Iterate component props
			for (let prop in userDefinedProps) {

				// If prop does not exist in component
				if (!(prop in result[componentName])) {
					console.error(`Reading user defined components props error: prop "${prop}" does not exist in "${componentName}"`);
					continue;
				}

				// Update prop with user defined one
				result[componentName][prop] = userDefinedProps[prop];
			}
		}
	}

	return result;
}