import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils'
import C from '../../src/runtime/components/grid.vue';

describe('grid component', async () => {
	const wrapper = mount(C, {
		props: {
			gap: '1rem',
			gridTemplateColumns: '1fr 1fr',
			textAlign: 'center'
		}
	});
	const html = wrapper.html();

	test('Component is mounted', async () => {
    	expect(html, 'component html is not found').toContain('grid');
	});

	test('gap', async () => {
    	expect(html, 'gap is not set').toContain('grid-gap: 1rem');
	});

	test('gridTemplateColumns', async () => {
		expect(html, 'grid-template-columns is not set').toContain('grid-template-columns: 1fr 1f');
	});

	test('gapTop', async () => {
		const wrapper = mount(C, {
			props: {
				gapTop: true,
			}
		});
		const html = wrapper.html();

		expect(html, 'gapTop is not set').toContain('padding-top');
	});

	test('gapBottom', async () => {
		const wrapper = mount(C, {
			props: {
				gapBottom: true,
			}
		});
		const html = wrapper.html();

		expect(html, 'gapTop is not set').toContain('padding-bottom');
	});

	test('textAlign', async () => {
		expect(html, 'textAlign is not set').toContain('tag-text-center');
	});
});
