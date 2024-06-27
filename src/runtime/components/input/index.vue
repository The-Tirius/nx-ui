<template>
	<section class="component-ui-input" :class="classes" @click="refInput.focus()">
		<ui-impulse-indicator :impulse="impulse" @update:impulse="$emit('update:impulse', false)" />

		<div class="com-content">
			<div class="slot-prepend" v-if="hasSlot('prepend')"><slot name="prepend"></slot></div>
			<div class="slot-default">
				<input
					ref="refInput"
					:value="modelValue"
					:type="type" 
					:placeholder="placeholder" 
					:disabled="disabled" 

					@change="updateValue($event.target.value)"
					@input="updateValue($event.target.value)"
					@blur="handleBlur($event.target.value)"
					@keyup.enter="updateValue($event.target.value, true, true)"

					@focus="haveFocus = true"

					formnovalidate
					spellcheck="false"
				/>
			</div>
			<div class="slot-append" v-if="hasSlot('append')"><slot name="append"></slot></div>
		</div>
	</section>
</template>

<script setup>
// Import
	import { ref, computed, useSlots } from 'vue';
	import UiImpulseIndicator from '../impulse-indicator.vue';
	import comProps from '#build/ui.input.mjs';

// Misc
	const emit = defineEmits(['input', 'enter', 'blur', 'update:modelValue']);
	const slots = useSlots();

// Data
	const props = defineProps({
		modelValue: {
			required: true
		},
		placeholder: {
			default: comProps.placeholder,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			default: 'text'
		},
		impulse: {
			default: false
		},
		shape: {
			type: String,
			default: comProps.shape,
		},
		size: {
			type: String,
			default: comProps.size,
		},
	});

	const refInput = ref(null);
	const haveFocus = ref(false);

	const classes = computed(() => {
		const ar = [];

		if (props.modelValue !== '') ar.push('tag-not-empty');
		if (haveFocus.value) ar.push('tag-focus');
		if (props.disabled) ar.push('tag-disabled');
		if (props.size) ar.push(`tag-size-${props.size}`);
		if (props.shape) ar.push(`tag-shape-${props.shape}`);

		return ar;
	});

// Methods
	function updateValue(value, doTrim = false, submit = false) {
		const validValue = doTrim ? value.trim() : value;

		if (value !== validValue)
			refInput.value.value = validValue;

		emit('update:modelValue', validValue);

		if (submit) emit('enter', validValue);
	}

	function handleBlur(v) {
		haveFocus.value = false;

		emit('blur', v);
		updateValue(v);
	}

	const hasSlot = (name) => {
		return !!slots[name];
	};
// Hooks

</script>

<style lang="less">
// Misc
@com-ani-ease: var(--ui-ani-ease);

// Input height
@com-input-height-large: var(--ui-input-height-large);
@com-input-height-big: var(--ui-input-height-big);
@com-input-height-medium: var(--ui-input-height-medium);
@com-input-height-default: var(--ui-input-height-default);
@com-input-height-small: var(--ui-input-height-small);
@com-input-height-mini: var(--ui-input-height-mini);

// Border radius
@com-border-radius-default: var(--ui-border-radius-default);
@com-border-radius-small: var(--ui-border-radius-small);
@com-border-radius-round: var(--ui-input-height-large);

// Color
@com-color-border-bolder: var(--ui-color-border-bolder);
@com-color-bg: var(--ui-color-bg);
@com-color-header-text: var(--ui-color-header-text);
@com-color-gray-text: var(--ui-color-gray-text);
@com-color-primary: var(--color-primary);

// Space
@com-space-small: var(--ui-space-small);
@com-space-mini: var(--ui-space-mini;);

// Font
@com-font-text: var(--ui-font-text);

// Text size
@com-text-default: var(--ui-text-default);
@com-text-small: var(--ui-text-small);
@com-text-mini: var(--ui-text-mini);

.component-ui-input {
	overflow: hidden;
	position: relative;
	height: @com-input-height-default;
	border: 1px solid @com-color-border-bolder;
	border-radius: @com-border-radius-default;
	background: @com-color-bg;
	cursor: text;

	.com-content {
		display: flex;
		height: 100%;

		> div {
			position: relative;
			height: 100%;
		}

		.slot-prepend,
		.slot-append {
			flex: 0 0 40px;
			display: grid;
			place-items: center;
		}
	}

	.slot-default {
		width: 100%;
	}

	input {
		box-sizing: border-box; -webkit-box-sizing: border-box; -moz-box-sizing: border-box;
		
		display: block;
		padding: 0 @com-space-mini;
		width: 100%;
		height: 100%;
		
		font-family: @com-font-text;
		font-size: @com-text-default;
		color: @com-color-header-text;

		background: transparent;
		border: none;
	}

	// Shape
	&.tag-shape-round {
		border-radius: @com-border-radius-round;
	}
	&.tag-shape-round-square {
		border-radius: @com-border-radius-small;
	}
	&.tag-shape-square {
		border-radius: 0;
	}

	// Size
	&.tag-size-large { height: @com-input-height-large; }
	&.tag-size-big { height: @com-input-height-big; }
	&.tag-size-medium { height: @com-input-height-medium; }
	&.tag-size-small {
		//padding: 0 @com-space-small;
		height: @com-input-height-small;
		font-size: @com-text-small;
	}

	&.tag-size-mini {
		//padding: 0 10px;
		height: @com-input-height-mini;

		font-size: @com-text-mini;

		.loading-indicator {
			transform: translate3d(-50%, -50%, 0) scale(0.6);
		}
	}

	// Focus
	&.tag-focus {
		border-color: @com-color-primary;
		outline: 1px solid @com-color-primary;
	}

	// Disabled
	&.tag-disabled {
		cursor: not-allowed;
		opacity: 0.6;

		input {
			cursor: not-allowed;
		}
	}
}
</style>