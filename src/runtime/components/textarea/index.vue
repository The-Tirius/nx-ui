<template>
	<section class="component-ui-textarea" :class="classes" @click="refInput.focus()">
		<textarea
			ref="refInput"
			:value="modelValue"
			:placeholder="placeholder" 
			:disabled="disabled" 

			@change="updateValue($event.target.value)"
			@input="updateValue($event.target.value)"
			@blur="handleBlur($event.target.value)"
			@keyup.enter="updateValue($event.target.value, true, true)"

			@focus="haveFocus = true"

			formnovalidate
			spellcheck="false"
		>
		</textarea>
	</section>
</template>

<script setup>
// Imports
	import { ref, computed } from 'vue';
	import comProps from '#build/ui.textarea.mjs';

// Misc
	const emit = defineEmits(['input', 'enter', 'blur', 'update:modelValue']);

// Data
	const props = defineProps({
		placeholder: {
			default: comProps.placeholder,
		},
		shape: {
			type: String,
			default: comProps.shape,
		},
		modelValue: {
			required: true
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		resize: {
			type: String,
			default: 'on',
		},
	});

	const refInput = ref(null);
	const haveFocus = ref(false);

	const classes = computed(() => {
		const ar = [
			`tag-resize-${props.resize}`
		];

		if (props.modelValue !== '') ar.push('tag-not-empty');
		if (haveFocus.value) ar.push('tag-focus');
		if (props.disabled) ar.push('tag-disabled');
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
</script>

<style lang="less">
// Misc
@com-ani-ease: var(--ui-ani-ease);

// Border radius
@com-border-radius-default: var(--ui-border-radius-default);
@com-border-radius-default-big: var(--ui-border-radius-big);

// Colors
@com-color-primary: var(--ui-color-primary);
@com-color-bg: var(--ui-color-bg);
@com-color-border-bolder: var(--ui-color-border-bolder);
@com-color-header-text: var(--ui-color-header-text);
@com-color-gray-text: var(--ui-color-gray-text);

// Padding
@com-space-default: var(--ui-space-default);
@com-space-mini: var(--ui-space-mini);
@com-space-small: var(--ui-space-small);

// Font
@com-font-text: var(--ui-font-text);

// Text size
@com-text-default: var(--ui-text-default);
@com-text-small: var(--ui-text-small);

.component-ui-textarea {
	position: relative;
	cursor: text;

	textarea {
		box-sizing: border-box;
		
		display: block;
		padding: @com-space-mini;
		width: 100%;
		height: 100px;
		
		font-family: @com-font-text;
		font-size: @com-text-default;
		color: @com-color-header-text;

		border: 1px solid @com-color-border-bolder;
		border-radius: @com-border-radius-default;
		background:  @com-color-bg;
	}

	// Resize
	&.tag-resize-on textarea { resize: vertical; }
	&.tag-resize-off textarea { resize: none; }
	&.tag-resize-both textarea { resize: both; }

	// Shapes
	&.tag-shape-round-square textarea {
		border-radius: @com-border-radius-default-big;
	}
	&.tag-shape-square textarea {
		border-radius: 0;
	}

	// Disabled
	&.tag-disabled {
		opacity: 0.6;
		cursor: not-allowed;

		textarea {
			cursor: not-allowed;
		}
	}

	// Focus
	&.tag-focus textarea {
		border-color: @com-color-primary;
		outline: 1px solid @com-color-primary;
	}
}
</style>