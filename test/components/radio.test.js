import { describe, test, expect, beforeAll} from 'vitest';
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue';
import wait from '../helpers/wait';
import C from '../../src/runtime/components/radio.vue';

describe('radio component', async () => {
	// Single component
	const wrapper = mount(C, {
		props: {
			value: 10,
			modelValue: 10,
			name: 'radiotest',
		}
	});
	const html = wrapper.html();

	// Multiple radio components
	const radio1 = {
		name: 'radio1',
		value: '1',
	};
	const radio2 = {
		name: 'radio2',
		value: '2',
	};
	const radio3 = {
		name: 'radio3',
		value: '3',
	};

	const selected = radio2;
	const compositionComponent = defineComponent({
		template: `
			<div>
				<ui-radio :class="radio1.name" v-model="selectedValue" :value="radio1.value" :name="radio1.name" :haveError="haveError"></ui-radio>
				<ui-radio :class="radio2.name" v-model="selectedValue" :value="radio2.value" :name="radio2.name"></ui-radio>
				<ui-radio :class="radio3.name" v-model="selectedValue" :value="radio3.value" :name="radio3.name"></ui-radio>
			</div>
		`,
		components: {
			'ui-radio': C
		},
		data() {
			return {
				radio1,
				radio2,
				radio3,
				selectedValue: selected.value,
				haveError: true
			}
		}
	});
	const compositionWrapper = mount(compositionComponent);

	//
	test('Component is mounted', async () => {
    	expect(compositionWrapper.html(), 'component html is not found').toContain('radio');
	});

	test('Check selected radio checked state', async () => {
    	const com = compositionWrapper.getComponent(`.${selected.name}`);
    	const elRadio = com.get(`input`);

		expect(com.props('value') === selected.value, 'value should be equal selected.value').toBe(true);
		expect(com.props('value') === com.props('modelValue'), 'value should be equal modelValue').toBe(true);
		expect(elRadio.element.checked, 'input should be checked').toBe(true);
	});

	test('Click on another radio check', async () => {
		const com = compositionWrapper.getComponent(`.${radio1.name}`);
		const elRadio1Input = com.get(`input`);

		expect(com.props('value') !== com.props('modelValue'), 'value should not be equal modelValue').toBe(true);
		expect(elRadio1Input.element.checked, 'input should not be checked').toBe(false);

		// Trigger change (click)
		await com.find('input').trigger('change');

		expect(com.props('value') === com.props('modelValue'), 'value should be equal modelValue').toBe(true);
		expect(elRadio1Input.element.checked, 'input should be checked').toBe(true);

		// Check previous element
		const comPrevSelected = compositionWrapper.getComponent(`.${radio2.name}`);
		const elPrevSelectedInput = comPrevSelected.get(`input`);

		expect(comPrevSelected.props('value') !== comPrevSelected.props('modelValue'), 'prev selected value should not be equal modelValue').toBe(true);
		expect(elPrevSelectedInput.element.checked, 'prev selected input should not be checked').toBe(false);
	});

	test('haveError', async () => {
		expect(html, `haveError should be set`).not.toContain('tag-error');

		await wrapper.setProps({ haveError: true });

		expect(wrapper.html(), `haveError should be set`).toContain('tag-error');
	});

	test('required', async () => {
		expect(html, `required should be set`).not.toContain('tag-required');

		await wrapper.setProps({ required: true });

		expect(wrapper.html(), `required should be set`).toContain('tag-required');
	});

	test('disabled', async () => {
		expect(html, `disabled should be set`).not.toContain('tag-disabled');

		await wrapper.setProps({ disabled: true });

		expect(wrapper.html(), `disabled should be set`).toContain('tag-disabled');
	});

	test('name', async () => {
		expect(html, `name should be set`).toContain('radiotest');

		await wrapper.setProps({ name: 'newradioname' });

		expect(wrapper.html(), `name should be changed`).toContain('newradioname');
	});
});
