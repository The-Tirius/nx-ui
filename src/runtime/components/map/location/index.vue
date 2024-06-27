<template>
	<section class="component-ui-map-location" :class="classes">
		<div class="location-slot-header">
			<slot name="header"></slot>
		</div>
		<div class="location-slot-default">
			<slot></slot>
		</div>
	</section>
</template>

<script setup>
// Data
const props = defineProps({
	width: {
		type: String,
		default: '340px'
	},
	showDefaultSlot: {
		type: Boolean,
		default: true
	}
});
const slots = useSlots();

const classes = computed(() => {
	const ar = [];

	if (hasSlot('header') && hasSlot('default') && props.showDefaultSlot) {
		 ar.push('tag-slot-header-and-default');
	} else {
		if (hasSlot('header')) ar.push('tag-slot-header');
		if (hasSlot('default') && props.showDefaultSlot) ar.push('tag-slot-default');
	}

	return ar;
});

// Methods
const hasSlot = (name) => {
    return !!slots[name];
};
</script>

<style lang="less">
@com-input-height: var(--ui-input-height-default);

@com-map-padding: var(--ui-map-padding);
@com-space-mini: var(--ui-space-mini);

.component-ui-map-location {
	pointer-events: none !important;
	position: absolute;
	inset: @com-map-padding;
	max-width: v-bind(width);

	.location-slot-header,
	.location-slot-default {
		position: absolute;
	}

	.location-slot-header {
		display: none;
		grid-template-columns: 1fr; // base columns and their sizes
  		grid-auto-flow: column; // tells to add new children as new columns
 		grid-auto-columns: 1fr; // tells the size of the dynamic columns
		gap: @com-space-mini;

		inset: 0 0 auto 0;
		max-width: 100%;
		height: @com-input-height;
	}

	.location-slot-default {
		pointer-events: none !important;
		inset: 0;

		* {
			pointer-events: auto;
		}
	}

	&.tag-slot-default,
	&.tag-slot-header-and-default {
		.location-slot-default {
			display: block;
		}
	}

	&.tag-slot-header,
	&.tag-slot-header-and-default {
		.location-slot-header {
			display: grid;
		}
	}

	&.tag-slot-header-and-default {
		.location-slot-default {
			inset: calc(@com-input-height + @com-space-mini) 0 0 0;
		}
	}
}

@media screen and (max-width: 500px) {
	.component-ui-map-location {
		max-width: 100%;
	}
}
</style>