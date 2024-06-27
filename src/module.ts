import {
	defineNuxtModule,
	addPlugin,
	addImports,
	addComponent,
	addComponentsDir,
	addTemplate,
	createResolver,
} from '@nuxt/kit';

import generateStyle from './utils/generateStyle';
import generateComponentsDefaults from './utils/generateComponentsDefaults';
import readComponentsProps from './utils/readComponentsProps';

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'ui',
		configKey: 'ui',
	},
	// Default configuration options of the Nuxt module
	defaults: {},
	setup(options, nuxt) {
		const { resolve } = createResolver(import.meta.url);

		// Add templates
		addTemplate({
			filename: 'ui.style.mjs',
			getContents: () => 'export default ' + JSON.stringify(generateStyle(options))
			//write: true
		});
		addTemplate({
			dst: './src/runtime/components/styles/components.less',
			write: true,
			filename: 'components.less',
			getContents: () => generateComponentsDefaults(options)
		});

		// Get component props
		const componentsProps = readComponentsProps(options);

		// Create virtual files with components props
		for (let componentName in componentsProps) {
			addTemplate({
				filename: `ui.${componentName}.mjs`,
				getContents: () => 'export default ' + JSON.stringify(componentsProps[componentName])
			});
		}
		
		// Add plugins
		addPlugin({
			src: resolve('./runtime/plugins/variables'),
			mode: 'server'
		});
		addPlugin({
			src: resolve('./runtime/plugins/methods'),
			mode: 'all'
		});

		// Components
		addComponentsDir({
			path: resolve('./runtime/components'),
			// watch: true,
			prefix: 'ui',
			pathPrefix: false,
			global: false,
			extensions: ['vue']
		});

		addComponent({
			filePath: resolve('./runtime/components/map/zoom'),
			name: 'ui-map-zoom',
			global: false,
		});
		addComponent({
			filePath: resolve('./runtime/components/map/device-zoom-switch'),
			name: 'ui-map-device-zoom-switch',
			global: false,
		});
		addComponent({
			filePath: resolve('./runtime/components/map/location/index'),
			name: 'ui-map-location',
			global: false,
		});
		addComponent({
			filePath: resolve('./runtime/components/map/location/list'),
			name: 'ui-map-location-list',
			global: false,
		});
		addComponent({
			filePath: resolve('./runtime/components/map/location/nearest'),
			name: 'ui-map-location-nearest',
			global: false,
		});
	},
});
