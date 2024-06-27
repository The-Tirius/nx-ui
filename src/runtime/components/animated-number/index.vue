<template>
	<span class="component-ui-animated-number">
		{{ val }}
	</span>
</template>

<script setup>
// Imports
	import { ref, watch } from 'vue';
	import animateValue from './animateValue';

// Data
	const props = defineProps({
		n: [Number, String],
		active: Boolean,
		delay: {
			type: Number,
			default: 0
		},
		duration: {
			type: Number,
			default: 4000
		},
	});

	const val = ref(0);
	let activated = false;

	watch(() => props.active, (v) => {
		if (!v || activated) return;

		activated = true;

		setTimeout(() => {
			animateValue(
				(v) => { val.value = v; },
				0,
				props.n,
				props.duration
			);
		}, props.delay);
	}, { immediate: true });
</script>