import { defineStore } from 'pinia';

// useGeneralStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useGeneralStore = defineStore('general', {
    // other options...
    state: () => {
        return {
            // all these properties will have their type inferred automatically
            age: 18,
            name: 'John Vue',
			menuMain: [
				{
					id: 'index',
					text: 'breadcrumbs.index',
					m: 1, // mobile
					d: 1 // desktop
				},
				{
					id: 'components',
					text: 'breadcrumbs.components',
					m: 1, // mobile
					d: 1 // desktop
				},
			]
        };
    },
	getters: {
		info( state ) {
			const { t } = useI18n();

			return `${state.name}, ${state.age} ${t('age')}`;
		}
	}
});