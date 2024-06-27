import { describe, it, expect } from 'vitest';
import url from 'node:url';
import fs from 'fs';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathComponents = path.resolve( __dirname, '../src/runtime/components' );

describe('LESS', async () => {
	it('Vue components are using less variables in allowed format (@com-*)', async () => {
		const files = fs.readdirSync(pathComponents, { recursive: true });
		const vueComponents = files.filter(name => name.endsWith('.vue'));
		const arValidVariants = ['import ', 'keyframes ', 'media', 'com-'];
		let errorMessage = '';

		for (let fileName of vueComponents) {
			const string = fs.readFileSync(path.resolve(pathComponents, fileName), { encoding: 'utf-8' });
			const styleAr = string.match(/<style([\s\S]*?)<\/style>/g);

			// If no style tag then skip
			if (!styleAr) continue;

			const s = styleAr[0];

			// Iterate style by characters
			for (let i=0; i < s.length; i++) {
				if (s[i] !== '@') continue;

				let varIsValid = false;

				// Iterate valid variants
				for (let variant of arValidVariants) {
					let variantIsValid = true;

					// Iterate variant by character
					for (let j=0; j < variant.length; j++) {
						// If characters does not match
						if (s[i + (j+1)] !== variant[j]) {
							variantIsValid = false;
							break;
						}
					}

					if (variantIsValid) {
						varIsValid = true;
						break;
					}
				}

				if (!varIsValid) {
					errorMessage = `\Component "${fileName}" is using less variables in wrong format`;
					errorMessage += `\nvalid option is "@com-*"`;
					errorMessage += `\nvariable used "${s[i] + s[i+1] + s[i+2] + s[i+3] + s[i+4] + s[i+5] + s[i+6] + s[i+7]}..."\n`
					expect(varIsValid, errorMessage).toBe(true);
				}
			}
		}
	});
});
