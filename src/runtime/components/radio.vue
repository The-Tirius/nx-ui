<template>
	<span class="component-ui component-ui-radio" :class="classes">
		<label>
			<input
				ref="input"
				type="radio" 
				:checked="isChecked"
				:value="value"
				:name="name"
				:disabled="disabled"
				autocomplete="off"
				@change="handleUpdate($event.target.value)"
			/>

			<i></i>

			<span>
				<slot></slot>
			</span>
		</label>
	</span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	name: {
		required: false,
		default: 'rd'
	},
	value: {
		required: true,
	},
	modelValue: { default: '' },
	haveError: {
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
})

const emit = defineEmits(['update:modelValue'])

const classes = computed(() => {
	const ar = [];

	if (props.value !== '') ar.push('tag-not-empty');
	if (props.haveError) 	ar.push('tag-error');
	if (props.text) 		ar.push('tag-text');
	if (props.disabled) 	ar.push('tag-disabled');
	if (props.required) 	ar.push('tag-required');

	return ar;
});

const isChecked = computed(() => props.modelValue == props.value);

function handleUpdate(v) {
	emit('update:modelValue', v);
}
</script>

<style lang="less">
.component-ui-radio {
	@com-color-primary: var(--ui-color-primary);
	@com-color-text-on-primar: var(--ui-color-text-on-primary);
	@com-color-border: var(--ui-color-border);
	@com-color-error: var(--ui-color-error);
	@com-color-text: var(--ui-color-text);
	@com-color-header-text: var(--ui-color-header-text);
	@com-color-gray-text: var(--ui-color-gray-text);
	
	@com-input-height: var(--ui-input-height-default);

	@com-text-medium: var(--ui-text-medium);
	@com-text-small: var(--ui-text-small);

	@com-space-micro: var(--ui-space-micro);

	@com-ani-time: var(--ui-ani-time);

	position: relative;
	display: inline-block;
	text-align: left;

	.error-wrap {
		position: absolute;
		top: 100%;
		left: 0;
		padding: 0;
		
		font-size: 11px;
		
		color: @com-color-error;
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
			line-height: 16px;
			text-align: center;
			font-size: 10px;

			border-radius: 50%;
			border: 1px solid @com-color-gray-text;

			color: @com-color-text-on-primar;

			&:before {
				content: '';

				transition: opacity @com-ani-time;

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
			color: @com-color-header-text;
		}
	}

	// Required
	&.tag-required {
		span:after {
			content: '*';
			padding-left: @com-space-micro;
			color: @com-color-error;
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
		> label { color: @com-color-error; }
	}
}
</style>