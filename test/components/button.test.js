import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils'
import C from '../../src/runtime/components/button/index.vue';

describe('button component', async () => {
	const text = 'hello world';

	const wrapper = mount(C, {
		slots: {
			default: text
		},
		props: {
			href: 'some/href/123',
			size: 'big',
			variant: 'outline',
			shape: 'circle',
			type: 'blockquote',
			block: true,
			loading: true,
			disabled: true,
		}
	});
	const html = wrapper.html();

	test('Component is mounted', async () => {
		expect(html, 'component html is not found').toContain('button');
	});

	test('slot', async () => {
		expect(html, `component slot should contain "${text}"`).toContain(text);
	});

	test('href', async () => {
		expect(html, `href is not set`).toContain('some/href/123');
	});

	test('size', async () => {
		expect(html, `size is not set`).toContain('tag-size-big');
	});

	test('variant', async () => {
		expect(html, `variant is not set`).toContain('tag-variant-outline');
	});

	test('shape', async () => {
		expect(html, `shape is not set`).toContain('tag-shape-circle');
	});

	test('type', async () => {
		expect(html, `type is not set`).toContain('blockquote');
	});

	test('block', async () => {
		expect(html, `block is not set`).toContain('tag-block');
	});

	test('loading', async () => {
		expect(html, `loading is not set`).toContain('tag-loading');
	});

	test('disabled', async () => {
		expect(html, `disabled is not set`).toContain('tag-disabled');
	});
});
