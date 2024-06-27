import { describe, test, expect, beforeAll} from 'vitest';
import { mount } from '@vue/test-utils'
import C from '../../src/runtime/components/select.vue';

describe('select component', async () => {
	let wrapper;
	const value = '1';
	const options = [
		{
			name: '#1',
			value: '1'
		},
		{
			name: '#2',
			value: '2'
		},
		{
			name: '#3',
			value: '3'
		},
	];

	beforeAll(() => {
		wrapper = mount(C, {
			props: {
				modelValue: value,
				options
			}
		});
	});

	test('Component is mounted', async () => {
    	expect(wrapper.html(), 'component html is not found').toContain('select');
	});

	test('Value is correct', async () => {
		const elSelect = wrapper.get('select');

		expect(elSelect.element.value, `select value is not equal "${value}"`).toBe(value);
	});

	test('Display value is correct', async () => {
		const elSelect = wrapper.get('.value strong');

		expect(elSelect.element.innerHTML, `.value text is not equal "${options[0].name}"`).toBe(options[0].name);
	});
});
