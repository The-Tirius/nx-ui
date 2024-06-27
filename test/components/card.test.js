import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils'
import C from '../../src/runtime/components/card.vue';

describe('card component', async () => {
	const wrapper = mount(C, {
		slots: {
			default: 'default slot test',
			footer: 'footer slot test',
		},
		props: {
			to: '/to/the/url',
			icon: 'the icon',
			iconTitle: 'the iconTitle',
			iconLink: 'the iconLink',
			title: 'the title',
		},
	});
	const html = wrapper.html();

	test('Component is mounted', async () => {
    	expect(html, 'component html is not found').toContain('card');
	});

	test('slot:default', async () => {
    	expect(html, 'default slot is not rendered').toContain('default slot test');
	});

	test('slot:footer', async () => {
    	expect(html, 'footer slot is not rendered').toContain('footer slot test');
	});

	test('to', async () => {
    	expect(html, 'to prop is not set').toContain('/to/the/url');
	});

	test('icon', async () => {
    	expect(html, 'icon prop is not set').toContain('the icon');
	});

	test('iconTitle', async () => {
    	expect(html, 'iconTitle prop is not set').toContain('the iconTitle');
	});

	test('iconLink', async () => {
    	expect(html, 'iconLink prop is not set').toContain('the iconLink');
	});

	test('title', async () => {
    	expect(html, 'title prop is not set').toContain('the title');
	});
});
