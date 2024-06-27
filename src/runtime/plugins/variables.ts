import { computed } from 'vue';
import { defineNuxtPlugin } from '#app';
import { useHead } from '#imports';

import style from '#build/ui.style.mjs';

export default defineNuxtPlugin(function(nuxt) {
	const computedStyle = computed(() => style);

    const headData: any = {
        style: [
            {
                innerHTML: () => computedStyle.value,
                tagPriority: -2,
                id: 'nuxt-ui-style',
            },
        ],
    };

	useHead(headData);
});
