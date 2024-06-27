import { describe, test, expect } from 'vitest';
import { mount as mountSuspended } from '@vue/test-utils'
import wait from '../helpers/wait';
import C from '../../src/runtime/components/countdown/index.vue';

//import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';

describe('countdown component', async () => {
	const wrapper = await mountSuspended(C, {
		props: {
			ms: 1000 * 60 * 100,
			h: 'hours',
			m: 'minutes',
			s: 'seconds',
		}
	});

	await wait(100);

	const html = wrapper.html();

	test('Component is mounted', async () => {
    	expect(html, 'component html is not found').toContain('countdown');
	});

	test('Component is ticking', async () => {
		const text = wrapper.text();
		expect(text.length > 1, `countdown is not ticking "${text}"`).toBe(true);
	});

	test('h', async () => {
    	expect(html, 'h is set').toContain('hours');
	});

	test('m', async () => {
    	expect(html, 'm is set').toContain('minutes');
	});

	test('s', async () => {
    	expect(html, 's is set').toContain('seconds');
	});
});
