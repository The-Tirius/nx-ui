<template>
	<section class="component-ui-loading2" :class="{'tag-active': active}">
		<svg width="32" height="32">
			<circle cx="16" cy="16" r="10" ref="progress" />
		</svg>
		<div class="text" v-if="slots?.default">
			<slot />
		</div>
	</section>
</template>

<script setup>
import { useSlots } from 'vue';

const slots = useSlots();

const props = defineProps({
	active: {
		type: Boolean,
		default: true
	}
});
</script>

<style lang="less">
// Misc
@com-ani-ease: var(--ui-ani-ease);
@com-ani-time: var(--ui-ani-time);

// Colors
@com-color-primary: var(--ui-color-primary);
@com-color-header-text: var(--ui-color-header-text);

// Text size
@com-text-small: var(--ui-text-small);

// Padding
@com-space-micro: var(--ui-space-micro);

@keyframes ui-loading-circle {
	0% {
		stroke-dashoffset: 63;
		transform: rotate(0deg);
	}
	50% {
		stroke-dashoffset: 0;
	}
	100% {
		stroke-dashoffset: -63;
		transform: rotate(360deg);
	}
}

.component-ui-loading2 {
	transition: visibility @com-ani-time @com-ani-ease, opacity @com-ani-time @com-ani-ease;

	opacity: 0;
	visibility: hidden;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: @com-space-micro;

	svg {
		transition: opacity 0.15s;

		flex: 0 0 32px;
		width: 32px;
		height: 32px;

		circle {
			transform: rotate(-90deg);
			transform-origin: 50%;
			
			fill: none;
			stroke: @com-color-primary;
			stroke-width: 2px;
			stroke-dasharray: 63 63;
			stroke-dashoffset: 63;

			animation: ui-loading-circle 2.2s cubic-bezier(0.2, 0.0, 0.2, 1) infinite;
		}
	}

	&.tag-active {
		opacity: 1;
		visibility: visible;
	}
}
</style>