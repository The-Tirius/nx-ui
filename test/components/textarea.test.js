import { describe, test, expect, beforeAll} from 'vitest';
import { mount } from '@vue/test-utils'
import C from '../../src/runtime/components/textarea/index.vue';

describe('textarea component', async () => {
	let wrapper;
	const value = '123';

	beforeAll(() => {
		wrapper = mount(C, {
			props: { 'modelValue': value }
		});
	});

	test('Component is mounted', async () => {
		const elTextarea = wrapper.get('textarea');

    	expect(wrapper.html(), 'component html is not found').toContain('textarea');
		expect(elTextarea.element.value, `textarea value is not equal "${value}"`).toBe(value);
		expect(wrapper.props('modelValue'), `component modelValue is not equal "${value}"`).toBe(value);
	});

	test('Change value', async () => {
		const elTextarea = wrapper.get('textarea');
		const newValue = 'hello world';

		await wrapper.setProps({
			modelValue: newValue
		});

		expect(elTextarea.element.value, `textarea value is not equal "${value}"`).toBe(newValue);
		expect(wrapper.props('modelValue'), `component modelValue is not equal "${value}"`).toBe(newValue);
	});
});
