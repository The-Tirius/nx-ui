import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils'
import C from '../../src/runtime/components/filter/index.vue';

describe('filter component', async () => {
	const wrapper = mount(C, {
		props: {
			items: [
				{ name: 'item1', value: 1 },
				{ name: 'item2', value: 2, icon: 'icon-test' },
				{ name: 'item3', value: 3 },
			],
			modelValue: 2,
			'onUpdate:modelValue': (v) => wrapper.setProps({ modelValue: v })
		}
	});
	const html = wrapper.html();

	test('Component is mounted', async () => {
    	expect(html, 'component html is not found').toContain('filter');
	});

	test('Items are render', async () => {
    	expect(html, 'item1 is render').toContain('item1');
    	expect(html, 'item2 is render').toContain('item2');
    	expect(html, 'item3 is render').toContain('item3');
	});

	test('item2 should have icon', async () => {
    	expect(html, 'item2 should have icon').toContain('icon-test');
	});

	test('Click test', async () => {
		expect(wrapper.props('modelValue'), 'modelValue before click should be 2').toBe(2);

		await wrapper.find('span').trigger('click');

		expect(wrapper.props('modelValue'), 'modelValue after click should be 1').toBe(1);
	});
});
