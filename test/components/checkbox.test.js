import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils'
import C from '../../src/runtime/components/checkbox.vue';

describe('checkbox component', async () => {
	const text = 'hello world';
	const wrapper = mount(C, {
		slots: {
			default: text
		},
		props: {
			modelValue: true,
			name: 'mycb',
			required: true,
			disabled: true,
			haveError: true,
			useBinaries: false
		}
	});
	const html = wrapper.html();

	test('component is mounted', async () => {
    	expect(html, 'component html is not found').toContain('checkbox');
	});

	test('slot', async () => {
    	expect(html, `component slot should contain "${text}"`).toContain(text);
	});

	test('name', async () => {
    	expect(html, 'name is not set').toContain('mycb');
	});

	test('required', async () => {
    	expect(html, 'required is not set').toContain('tag-required');
	});

	test('haveError', async () => {
    	expect(html, 'haveError is not set').toContain('tag-error');
	});

	test('Is checked', async () => {
    	expect(wrapper.props('modelValue'), `modelValue is checked`).toBe(true);
    	expect(wrapper.find('input').element.checked, `input is checked`).toBe(true);
	});

	test('Uncheck', async () => {
		await wrapper.setProps({
			modelValue: false
		});
		expect(wrapper.props('modelValue'), `modelValue is unchecked`).toBe(false);
    	expect(wrapper.find('input').element.checked, `component is unchecked`).toBe(false);
	});
});

describe('checkbox component (useBinaries = true)', async () => {
	const text = 'hello world';
	const wrapper = mount(C, {
		slots: {
			default: text
		},
		props: {
			modelValue: 1,
			name: 'mycb',
			required: true,
			disabled: true,
			haveError: true,
			useBinaries: true
		}
	});
	const html = wrapper.html();

	test('component is mounted', async () => {
    	expect(html, 'component html is not found').toContain('checkbox');
	});

	test('slot', async () => {
    	expect(html, `component slot should contain "${text}"`).toContain(text);
	});

	test('name', async () => {
    	expect(html, 'name is not set').toContain('mycb');
	});

	test('required', async () => {
    	expect(html, 'required is not set').toContain('tag-required');
	});

	test('haveError', async () => {
    	expect(html, 'haveError is not set').toContain('tag-error');
	});

	test('Is checked', async () => {
		expect(wrapper.props('modelValue'), `modelValue is checked`).toBe(1);
    	expect(wrapper.find('input').element.checked, `component is checked`).toBe(true);
	});

	test('Uncheck', async () => {
		await wrapper.setProps({
			modelValue: 0
		});
		expect(wrapper.props('modelValue'), `modelValue is unchecked`).toBe(0);
    	expect(wrapper.find('input').element.checked, `component is unchecked`).toBe(false);
	});
});
