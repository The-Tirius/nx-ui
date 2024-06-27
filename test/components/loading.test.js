import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils'
import C from '../../src/runtime/components/loading.vue';

describe('loading component', async () => {
	const text = 'hello world';
	const wrapper = mount(C, {
		slots: {
			default: text
		}
	});
	const html = wrapper.html();

	test('Component is mounted', async () => {
    	expect(html, 'component html is not found').toContain('loading');
	});

	test('active', async () => {
		expect(html, `active should be set`).toContain('tag-active');

		await wrapper.setProps({ active: false });

		expect(wrapper.html(), `active should not be set`).not.toContain('tag-active');
	});
});
