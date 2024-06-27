<template>
	<section class="component-typography g-typography" :class="classes">
		<slot />
	</section>
</template>

<script setup>
	const props = defineProps({
		theme: {
			type: String,
			default: '',
		},
	});

	const classes = computed(() => {
		let result = [];

		if (props.theme) {
			result.push('tag-theme-' + props.theme);
			result.push('tag-theme-is-set');
		}

		return result;
	});
</script>