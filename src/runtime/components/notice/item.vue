<template>
	<div class="component-ui-notice-item">
		<slot></slot>

		<i class="btn-close" @click="store.remove(id)">
			<svg class="progress" width="32" height="32">
				<circle cx="16" cy="16" r="14" />
			</svg>
		</i>
	</div>
</template>

<script setup>
// Imports
	import { useUINoticeStore } from './store';

// Data
	const props = defineProps([
		'id', 'duration'
	]);

	const store = useUINoticeStore();

	const computedDuration = computed(() => {
		return `${props.duration}ms`;
	});

// Hooks
	onMounted(() => {
		// Remove notice after duration end
		setTimeout(() => store.remove(props.id), props.duration);
	});
</script>

<style lang="less">
@com-border-radius-default: var(--ui-border-radius-default);

@com-color-secondary: var(--ui-color-secondary);
@com-color-border: var(--ui-color-border);
@com-color-surface: var(--ui-color-surface);
@com-color-header-text: var(--ui-color-header-text);
@com-color-gray-text: var(--ui-color-gray-text);

@com-space-medium: var(--ui-space-medium);
@com-space-mini: var(--ui-space-mini);

@com-bs-2: var(--ui-bs-2);


@keyframes ui-notice-loading-circle {
	0% {
		stroke-dashoffset: 88;
	}
	100% {
		stroke-dashoffset: 0;
	}
}

.component-ui-notice-item {
	--duration: v-bind(computedDuration);

	transform-origin: center;
	transition: all 0.5s ease;

	position: relative;
	margin-top: @com-space-mini;
	padding: @com-space-medium;

	border: 1px solid @com-color-border;
	border-radius: @com-border-radius-default;
	background: @com-color-surface;
	box-shadow: @com-bs-2;

	.btn-close {
		position: absolute;
		top: 10px;
		right: 10px;

		width: 32px;
		height: 32px;
		cursor: pointer;

		&:before,
		&:after {
			content: '';

			transform-origin: center;

			position: absolute;
			top: 50%;
			left: 50%;

			width: 12px;
			height: 1px;

			background: @com-color-header-text;
		}

		&:before { transform: translate3d(-50%, -50%, 0) rotate(45deg); }
		&:after { transform: translate3d(-50%, -50%, 0) rotate(-45deg); }

		circle {
			transform: rotate(-90deg);
			transform-origin: 50%;
			
			fill: none;
			stroke: @com-color-gray-text;
			stroke: @com-color-secondary;
			stroke-width: 1px;

			stroke-dasharray: 88 88;
			stroke-dashoffset: 88;

			animation: ui-notice-loading-circle var(--duration) linear;
		}
	}
}
</style>