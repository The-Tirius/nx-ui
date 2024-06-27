<template>
	<span class="component-ui component-ui-checkbox" :class="classes">
		<label>
			<input
				ref="input"
				type="checkbox" 
				:name="name"
				:checked="isChecked"
				:disabled="disabled"
				@change="updateValue($event.target.checked)"
				autocomplete="off"
			/>

			<i></i>

			<span>
				<slot></slot>
			</span>
		</label>
	</span>
</template>

<script setup>
// Imports
	import { computed } from 'vue';

//
	const props = defineProps({
		name: {
			required: false,
			default: 'cb'
		},
		modelValue: {
			required: true,
		},
		haveError: {
			type: Boolean,
			default: false
		},
		useBinaries: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		}
	});

	const emit = defineEmits(['change', 'onchange', 'update:modelValue']);

	const classes = computed(() => {
		const ar = [];

		if (props.haveError) 	ar.push('tag-error');
		if (props.disabled) 	ar.push('tag-disabled');
		if (props.required) 	ar.push('tag-required');

		return ar;
	});

	const isChecked = computed(() => {
		let result = props.modelValue;

		if (props.useBinaries) result = (result === 1 || result === '1') ? true : false;

		return result;
	});

	// Methods
	function updateValue(checked) {
		let value = checked;

		if (props.useBinaries) value = value ? 1 : 0;

		emit('change', value);
		emit('update:modelValue', value);
		emit('onchange', value);
	};
</script>

<style lang="less">
.component-ui-checkbox {
	@com-color-primary: var(--ui-color-primary);
	@com-color-text-on-primary: var(--ui-color-text-on-primary);
	@com-color-border: var(--ui-color-border);
	@com-color-red: var(--ui-color-red);

	@com-color-text: var(--ui-color-text);
	@com-color-header-text: var(--ui-color-header-text);
	@com-color-gray-text: var(--ui-color-gray-text);
	@com-color-error-text: var(--ui-color-error);

	@com-text-medium: var(--ui-text-medium);
	@com-text-small: var(--ui-text-small);

	@com-input-height: var(--ui-input-height-default);

	@com-space-micro: var(--ui-space-micro);

	position: relative;
	display: inline-block;
	text-align: left;

	.error-wrap {
		position: absolute;
		top: 100%;
		left: 0;
		padding: 0;
		
		font-size: 11px;
		
		color: @com-color-error-text;
		background: transparent;

		&:before, &:after { display: none; }
	}
	
	> label {
		position: relative;
		display: flex;
		align-items: center;
  		justify-content: left;
		margin: 0;
		padding: 0 0 0 30px;

		height: @com-input-height;
		line-height: @com-input-height;
		font-size: @com-text-small;
		font-weight: 500;

		color: @com-color-text;
		cursor: pointer;

		> input {
			position: absolute;
			top: 0;
			left: 0;
			margin: 0;
			padding: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
			cursor: pointer;
		}

		> i {
			transition: background 0.25s, border-color 0.25s;

			position: absolute;
			top: 50%;
			left: 0;
			margin-top: -9px;
			width: 18px;
			height: 18px;
			border-radius: 3px;
			border: 1px solid @com-color-gray-text;

			color: @com-color-text-on-primary;

			&:before {
				content: '';

				transition: opacity 0.25s;

				opacity: 0;

				position: absolute;
				inset: 0;
				background-position: center;
				background-repeat: no-repeat;
				background-size: 10px;
				background-image: url(./icons/check.white.svg);
			}
		}

		> input:checked + i {
			border-color: @com-color-primary;
			background: @com-color-primary;

			&:before {
				opacity: 1;
			}
		}

		> a {
			pointer-events: none;
			position: relative;
		}

		span {
			//font-weight: 600;
			color: @com-color-header-text;
		}
	}

	// Required
	&.tag-required {
		span:after {
			content: '*';
			padding-left: @com-space-micro;
			color: @com-color-red;
			font-weight: bold;
			font-size: @com-text-medium;
		}
	}

	// Disabled
	&.tag-disabled {
		opacity: 0.6;

		label,
		input {
			cursor: default;
		}
	}

	// Error
	&.tag-error {
		> label { color: @com-color-error-text; }
	}
}
</style>