import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils'
import C from '../../src/runtime/components/accordion.vue';

describe('accordion component', async () => {
	const wrapper = mount(C, {
		props: {
			list: [
				{title: 'item1', text: 'lorem ipsum'},
				{title: 'item2', text: 'lorem ipsum'},
				{title: 'item3', text: 'lorem ipsum'},
			],
			iconLight: 'iconLight.svg'
		}
	});
	const html = wrapper.html();

	test('component is mounted', async () => {
    	expect(html, 'component html is not found').toContain('accordion');
    	expect(html, `component slot should contain "item1"`).toContain('item1');
    	expect(html, `component slot should contain "item2"`).toContain('item2');
    	expect(html, `component slot should contain "item3"`).toContain('item3');
	});
});