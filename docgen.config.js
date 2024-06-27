module.exports = {
	componentsRoot: './src',
	components: '**/**/*.vue',
	outDir: './temp/tempdocs', // folder to save components docs in (relative to the current working directry)
	defaultExamples: false,
	templates: {
		// global component template wrapping all others see #templates
		component(renderedUsage, doc, config, fileName, requiresMd) {
			const { description, docsBlocks } = doc;

			const name = 'ui-' + fileName
						.replace(/index/g, '')
						.replace('runtime/components/', '')
						.replace('.vue', '')
						.replace(/\//g, '-')
						.replace(/-$/, '');

			return `
  # ${name}

  ${description ? '> ' + description : ''}

  ${renderedUsage.props}
  ${renderedUsage.methods}
  ${renderedUsage.events}
  ${renderedUsage.slots}
  ${docsBlocks ? '---\n' + docsBlocks.join('\n---\n') : ''}
  `;
		}
	},
};