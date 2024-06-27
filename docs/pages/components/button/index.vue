<template>
	<section>
		<section-title>ui-button</section-title>

		<lazy-component-preview title="Example" :example="ExampleRaw">
			<template #description>
				ui-button usage example
			</template>
			<template #default>
				<Example />
			</template>
		</lazy-component-preview>
	</section>
</template>

<script setup>
import ExampleRaw from './example.vue?raw';
import Example from './example.vue';

const { t } = useI18n();

useHead({
	title: t('breadcrumbs.button')
});
</script>