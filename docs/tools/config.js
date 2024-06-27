const fs = require('fs');
const path = require('path');

module.exports = function() {
	const configDir = path.resolve(__dirname, '../config/');
	const outputDir = path.resolve(__dirname, '../');
	let result = {};
	let configMap = {};

	// Load "base" config
	if (!fs.existsSync(path.join(configDir, 'base.js')))
		throw new Error(`[config.js] config file "base.js" does not exist`);

	result = Object.assign(result, require('../config/base'));

	// Load awailable configs in "configMap"
	fs.readdirSync(configDir).forEach((fileNameFull) => {
		if (fileNameFull !== 'base.js' && fileNameFull.indexOf('.js') !== -1) {
			let fileName = fileNameFull.replace('.js', '');

			configMap[ fileName ] = require(path.resolve(configDir, fileNameFull));
		}
	});

	// Pick selected config is it exist
	if (!configMap.hasOwnProperty(process.env.NODE_ENV))
		throw new Error(`[config.js] config file "${process.env.NODE_ENV}" does not exist`);

	result = Object.assign({}, result, configMap[ process.env.NODE_ENV ]);

	// Save config file
	fs.writeFileSync(path.join(outputDir, 'config.generated.json'), JSON.stringify(result));
};