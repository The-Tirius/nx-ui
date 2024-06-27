import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils'
import C from '../../src/runtime/components/impulse-indicator.vue';

describe('impulse-indicator component', async () => {
	test('Component is mounted', async () => {
		const wrapper = mount(C);
		const html = wrapper.html();

    	expect(html, 'component html is not found').toContain('impulse-indicator');
	});
});
