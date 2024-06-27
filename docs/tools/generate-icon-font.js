/**
 * Generate icon font
 * 
 * This script take svg icons from /assets/icon-font/icons directory
 * and generate: 
 * - /public/fonts/ic.woff2 - font file
 * - /assets/styles/icon-font.generated.less - font css
 * - /assets/styles/icon-font-vars.generated.less - less variables, (example: "@ic-email: '\ea12';")
 * 
 * Icons can be accessed with this css classes "ic ic-{svg file name}"
 * 
 * Notes: 
 * - it's highly recommended that svg have size of at less 1000x1000 (px).
 * - This script utilize /temp directory, make sure it's available.
 */
const path = require('path');
const { promises: fs } = require('fs');

const svgtofont = require('svgtofont');

const pathFontSource = path.resolve(__dirname, '../assets/icon-font/icons');
const pathFontOutput = path.resolve(__dirname, '../public/fonts/');
const pathFontTempOutput = path.resolve(__dirname, '../temp');
const pathFontCssOutput = path.resolve(__dirname, '../assets/styles/icon-font.generated.less');
const pathFontVariablesOutput = path.resolve(__dirname, '../assets/styles/icon-font-vars.generated.less');

svgtofont({
	src: pathFontSource,
	dist: pathFontTempOutput,
	fontName: 'ic',
	css: true,
}).then(async () => {

	await fs.copyFile(path.resolve(pathFontTempOutput, 'ic.woff2'), path.resolve(pathFontOutput, 'ic.woff2'));

	const cssOriginal = await fs.readFile(path.resolve(pathFontTempOutput, 'ic.css'), 'utf-8');
	const arCssOriginal = cssOriginal.split('\n');
	const ts = Date.now();
	let css = `
		@font-face {
			font-family: "ic";
			src: url("/fonts/ic.woff2?t=${ts}") format("woff2");
		}
	  
	  	.ic {
			font-family: 'ic' !important;
			font-style:normal;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			text-align: center;
	 	}

		.ic:before {
			display: block;
		}
	`;
	let variables = '';
	let classes = '';

	let rxName = new RegExp(/\.(.*?):before/);
	let rxValue = new RegExp(/content: "(.*?)";/);

	for (let line of arCssOriginal) {
		if (!line.startsWith('.ic-')) continue;

		let name = rxName.exec(line)[1];
		let val = rxValue.exec(line)[1];

		variables += `\n @${name}: '${val}';`;
		classes += '\n' + line.replace(`"${val}"`, `@${name}`);
	}

	css += '\n' + classes;

	await fs.writeFile(pathFontVariablesOutput, variables);
	await fs.writeFile(pathFontCssOutput, css);

	console.log('Icon font succisfuly generated');
});