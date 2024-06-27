import { describe, test, expect, beforeAll} from 'vitest';
import { mount } from '@vue/test-utils'
import wait from '../helpers/wait';
import C from '../../src/runtime/components/input/index.vue';

describe('input component', async () => {
	const value = '123';

	const wrapper = mount(C, {
		props: {
			modelValue: value,
			placeholder: 'my placeholder',
			size: 'default',
			shape: 'square',
		}
	});
	const elInput = wrapper.get('input');
	const html = wrapper.html();

	test('component is mounted', async () => {
    	expect(wrapper.html(), 'component html is not found').toContain('input');
	});

	test('check input value', async () => {
    	expect(elInput.element.value, `input value is not equal "${value}"`).toBe(value);
		expect(wrapper.props('modelValue'), `component modelValue is not equal "${value}"`).toBe(value);
	});

	test('change value', async () => {
		const newValue = 'hello world';

		await wrapper.setProps({
			modelValue: newValue
		});

		expect(elInput.element.value, `input value is not equal "${value}"`).toBe(newValue);
		expect(wrapper.props('modelValue'), `component modelValue is not equal "${value}"`).toBe(newValue);
	});

	test('placeholder', async () => {
    	expect(elInput.element.placeholder, `placeholder is not set`).toBe('my placeholder');
	});

	test('disabled', async () => {
    	expect(html, `disabled should not be set`).not.toContain('tag-disabled');

		await wrapper.setProps({ disabled: true });

		expect(wrapper.html(), `disabled should be set`).toContain('tag-disabled');
	});

	test('size', async () => {
    	expect(html, `size should be default`).toContain('tag-size-default');

		await wrapper.setProps({ size: 'big' });

		expect(wrapper.html(), `size should be big`).toContain('tag-size-big');
	});

	test('shape', async () => {
    	expect(html, `shape should be square`).toContain('tag-shape-square');

		await wrapper.setProps({ shape: 'round' });

		expect(wrapper.html(), `shape should be round`).toContain('tag-shape-round');
	});

	test('type', async () => {
    	expect(html, `type should be text`).toContain('type="text"');

		await wrapper.setProps({ type: 'password' });

		expect(wrapper.html(), `type should be password`).toContain('type="password"');
	});
});
