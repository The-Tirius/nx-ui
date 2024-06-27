import { describe, test, expect, beforeAll} from 'vitest';
import { mount } from '@vue/test-utils'
import C from '../../src/runtime/components/tooltip.vue';

describe('tooltip component', async () => {
	const text = 'hello world';
	const wrapper = mount(C, {
		slots: {
			default: text
		},
		props: {
			modelValue: 0,
			location: 'left',
		}
	});
	const html = wrapper.html();

	console.log('tooltip', html);
	

	test('Component is mounted', async () => {
    	expect(html, 'component html is not found').toContain('tooltip');
    	expect(html, `component slot should contain "${text}"`).toContain(text)
	});

	test('slot', async () => {
    	expect(html, `component slot should contain "${text}"`).toContain(text);
	});

	test('modelValue', async () => {
    	expect(html, `component is active`).not.toContain('tag-active');
	});

	test('location', async () => {
    	expect(html, `location is set`).toContain('tag-location-left');
	});

	test('modelValue change to 1', async () => {
		await wrapper.setProps({
			modelValue: 1
		});

		const html = wrapper.html();

    	expect(html, `component is active`).toContain('tag-active');
	});
});
