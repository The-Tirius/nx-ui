<template>
	<section class="component-ui component-ui-filter">
		<span 
			v-for="item of items" 
			@click="$emit('update:modelValue', genUpdatedValue(item.value))" 
			:class="{'tag-active': isSelected(item.value)}"
		>
			<i v-if="item.icon" :class="item.icon"></i>
			{{ item.name }}
		</span>
	</section>
</template>
<script setup>
// Imports
import { computed } from 'vue';
import comProps from '#build/ui.filter.mjs';

//
const props = defineProps({
	/*
	[
		{
			name: '..',
			value: '..',
			icon?: 'icon-home'
		}
	]
	*/
	items: {
		type: Array,
		default: () => [],
		required: true
	},
	modelValue: {
		required: true
	},
	activeColor: {
		type: String,
		required: false,
		default: comProps.activeColor
	},
	activeBg: {
		type: String,
		required: false,
		default: comProps.activeBg
	},
});

const computedModel = computed(() => {
	return props.modelValue;
});

const isMultiSelect = computed(() => {
	return Array.isArray(props.modelValue);
});

// Methods
function isSelected(id) {
	if (isMultiSelect.value) {
		return computedModel.value.includes(id);
	} else {
		return computedModel.value === id;
	}
}

function genUpdatedValue(id) {
	// If multi select
	if (isMultiSelect.value) {
		// If item already in array then remove it
		if (isSelected(id)) {
			let ar = [...computedModel.value];

			for (let i=0; i < ar.length; i++) {
				if (ar[i] === id) ar.splice(i--, 1);
			}

			return ar;
		// If item not in array then add it
		} else {
			return [...computedModel.value, id];
		}
		
	// If single select
	} else {
		return id;
	}
}
</script>

<style lang="less">
.component-ui-filter {
	@com-space-default: var(--ui-space-default);
	@com-space-small: var(--ui-space-small);

	@com-input-height-small: var(--ui-input-height-small);

	--active-color: v-bind(activeColor);
	--active-bg: v-bind(activeBg);

	overflow-x: auto;
	overflow-y: hidden;
	white-space: nowrap;

	margin-inline: calc(@com-space-default * -1);
	padding: @com-space-default;

	span {
		user-select: none;

		display: inline-flex;

		vertical-align: top;
		margin-right: @com-space-small;
		padding: 0 @com-space-small;

		height: @com-input-height-small;
		line-height: @com-input-height-small;

		border-radius: 30px;
		cursor: pointer;
	}

	i {
		margin-right: 8px;
		width: 18px;
		height: 18px;
		font-size: 18px;
		color: var(--active-bg);
	}

	.tag-active {
		color: var(--active-color);
		background: var(--active-bg);

		i {
			color: var(--active-color);
		}
	}
}
</style>