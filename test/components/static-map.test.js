import { describe, test, expect, beforeAll} from 'vitest';
import { mount } from '@vue/test-utils'
import C from '../../src/runtime/components/static-map.vue';

describe('static-map component', async () => {
	let wrapper;

	beforeAll(() => {
		wrapper = mount(C, {
			props: {
				address: 'Some address 100-1',
				image: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Angling_in_Troubled_Waters_A_Serio-Comic_Map_of_Europe.jpg'
			}
		});
	});

	test('Component is mounted', async () => {
    	expect(wrapper.html(), 'component html is not found').toContain('static-map');
	});
});
