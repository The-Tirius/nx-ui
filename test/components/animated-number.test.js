import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils'
import wait from '../helpers/wait';
import C from '../../src/runtime/components/animated-number/index.vue';

describe('animated-number component', async () => {
	const wrapper = mount(C, {
		props: {
			n: 10000,
			duration: 1000
		}
	});
	const html = wrapper.html();

	test('component is mounted', async () => {
    	expect(html, 'component html is not found').toContain('animated-number');
	});

	test('number is 0', async () => {
    	expect(wrapper.element.innerHTML, 'number is not 0').toBe('0');
	});

	test('animation test', async () => {
		await wrapper.setProps({ active: true });

		await wait(100);

		expect(parseInt(wrapper.element.innerHTML) > 0, 'number is 0').toBe(true);
	});
});
