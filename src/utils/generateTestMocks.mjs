/**
 * Generate mock files for Vitest
 */
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import readComponentsProps from './readComponentsProps.js';

// Variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create mocks for components props
const componentsProps = readComponentsProps();

console.log(`\nGenerating mock files for Vitest...`);

for (let componentName in componentsProps) {
	const itemPath = `test/mocks/ui.${componentName}.mjs`;

	fs.writeFileSync(
		path.resolve(__dirname, `../../`, itemPath),
		'export default ' + JSON.stringify(componentsProps[componentName])
	);

	console.log(`✔️ ${itemPath} file was created`);
}

console.log(`Operation complete. ${Object.keys(componentsProps).length} mock files was created`);