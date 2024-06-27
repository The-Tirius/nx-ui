import { describe, it, expect } from 'vitest';
import { fileURLToPath } from 'node:url';
import path from 'node:path'
import { setup, $fetch } from '@nuxt/test-utils';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Docs website', async () => {
    await setup({
        server: true,
 		rootDir: path.join(__dirname, '../../docs'),
    });

    it('renders the index page', async () => {
        // Get response to a server-rendered page with `$fetch`.
        const html = await $fetch('/');

        expect(html).toContain('nuxt-ui-style');
    });
});
