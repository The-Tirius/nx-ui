<template>
	<div class="component-ui component-ui-tooltip" :class="classes" @click="requestHide">
		<slot></slot>
	</div>
</template>

<script setup>
// Imports
	import { computed, watch } from 'vue';

// Data
	const props = defineProps({
		modelValue: {
			default: false,
		},
		location: {
			type: String,
			default: 'top'
		},
		textColor: {
			type: String,
			default: 'var(--ui-color-text-on-surface)'
		},
		bg: {
			type: String,
			default: 'var(--ui-color-surface)'
		}
	});

	const emit = defineEmits(['update:modelValue']);

	let t; // timeout

	const classes = computed(() => {
		const result = [`tag-location-${props.location}`];

		if (props.modelValue) result.push('tag-active');

		return result;
	});

	watch(() => props.modelValue, (v) => {
		if (v) 
			show(); 
		else
			clearTimeout(t);
	});

// Methods
	function show() {
		clearTimeout(t);
		t = setTimeout(() => {
			requestHide();
		}, 5000);
	}

	function requestHide() {
		emit('update:modelValue', false);
	}
</script>

<style lang="less">
@com-ani-time: var(--ui-ani-time);
@com-ani-ease: var(--ui-ani-ease);

@com-space-small: var(--ui-space-small);
@com-space-mini: var(--ui-space-mini);

@com-text-small: var(--ui-text-small);

@com-color-border-bolder: var(--ui-color-border-bolder);

@com-border-radius-default: var(--ui-border-radius-default);
@com-bs-1: var(--ui-bs-1);

.component-ui-tooltip {
	--ui-tooltip-text-color: v-bind(textColor);
	--ui-tooltip-bg: v-bind(bg);

	transition: all @com-ani-time @com-ani-ease;

	opacity: 0;
	visibility: hidden;
	position: absolute;
	padding: @com-space-mini;
	min-width: 200px;
	line-height: 1.3;
	font-size: @com-text-small;
	color: var(--ui-tooltip-text-color);
	background: var(--ui-tooltip-bg);
	border-radius: @com-border-radius-default;
	border: 1px solid @com-color-border-bolder;
	box-shadow: @com-bs-1;

	&:after {
		content: '';

		position: absolute;
		width: 0;
		height: 0;
		border-style: solid;
	}

	&.tag-location-top {
		transform: translate3d(-50%, calc(@com-space-small * -1), 0);
		bottom: 100%;
		left: 50%;

		&:after {
			transform: translate3d(-50%, 0, 0);
			left: 50%;
			top: 100%;
			border-width: 10px 8px 0 8px;
			border-color: @com-color-border-bolder transparent transparent transparent;
		}
	}

	&.tag-location-left {
		transform: translate3d(calc(@com-space-small * -1), -50%, 0);
		top: 50%;
		right: 100%;

		&:after {
			transform: translate3d(0, -50%, 0);
			left: 100%;
			top: 50%;
			border-width: 8px 0 8px 10px;
			border-color: transparent transparent transparent @com-color-border-bolder;
		}
	}

	&.tag-active {
		opacity: 1;
		visibility: visible;
	}
}
</style>