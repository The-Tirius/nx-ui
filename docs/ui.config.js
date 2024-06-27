export default {
	style: {
		// Misc
		'content-width': '1400px',

		// Border radius
		'border-radius-big': '18px',
		'border-radius-default': '9px',
		'border-radius-small': '5px',
		
		// Inputs height
		'input-height-large': 'var(--input-height-large)',
		'input-height-big': 'var(--input-height-big)',
		'input-height-medium': 'var(--input-height-medium)',
		'input-height-default': 'var(--input-height-default)',
		'input-height-small': 'var(--input-height-small)',
		'input-height-mini': 'var(--input-height-mini)',

		// Line height
		'text-line-height': 1.4,

		// Colors
		'color-text': 'var(--color-text)',
		'color-header-text': 'var(--color-header-text)',

		'color-primary': 'var(--color-primary)',
		'color-primary-text': 'var(--color-primary-text)',
		'color-text-on-primary': '#fff',

		'color-secondary': 'var(--color-secondary)',
		'color-secondary-text': 'var(--color-secondary-text)',
		'color-text-on-secondary': 'var(--color-text-on-secondary)',

		'color-gray': 'var(--color-gray)',
		'color-gray-text': 'var(--color-gray-text)',
		'color-text-on-gray': 'var(--color-text-on-gray)',

		'color-red': 'var(--color-red)',
		'color-red-text': 'var(--color-red)',
		'color-text-on-red': '#fff',

		'color-error': 'var(--color-red)',

		'color-surface': 'var(--color-surface)',
		'color-surface-text': '#aaa',
		'color-text-on-surface': 'var(--color-text)',

		'color-bg': 'var(--color-bg)',
		'color-bg-text': '#fff',
		'color-text-on-bg': 'var(--color-text)',

		'color-border': 'var(--color-border)',
		'color-border-bolder': 'var(--color-border-bolder)',

		// Text
		'text-large': '32px',
		'text-big': '24px',
		'text-medium': '18px',
		'text-default': '16px',
		'text-small': '14px',
		'text-mini': '12px',

		// Font
		'font-text': 'var(--font-text)',
		'font-header': 'var(--font-header)',
		'font-accent': 'var(--font-text)',
		'font-icons': 'FontAwesome',
		'font-mono': 'var(--font-mono)',

		// Space
		'space-extra-large': '100px',
		'space-large': '50px',
		'space-big': '32px',
		'space-medium': '25px',
		'space-default': '20px',
		'space-small': '15px',
		'space-mini': '10px',
		'space-micro': '5px',

		// Box shadow
		'bs-1': 'var(--bs-1)',
		'bs-2': 'var(--bs-2)',
		'bs-3': 'var(--bs-3)',

		// Animation
		'ani-time': '0.3s',
		'ani-ease': 'ease'
	},
	componentsStyle: {
		// accordion: {
		// 	'title-font-size': 'var(--text-medium)',
		// },
		// button: {
		// 	'border-radius': 'var(--ui-border-radius-small)',
		// }
	},
	componentsProps: {
		button: {
			shape: 'round-square'
		},
		countdown: {
			ms: 15000,
			h: 'час.',
			m: 'мин.',
			s: 'сек.',
		}
	},
};