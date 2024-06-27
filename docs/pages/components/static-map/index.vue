<template>
	<section id="page-ui-static-map">
		<section-title>ui-static-map</section-title>

		<component-preview title="Example" :example="ExampleRaw">
			<template #default>
				<Example />
			</template>
		</component-preview>
	</section>
</template>

<script setup>
import ExampleRaw from './example.vue?raw';
import Example from './example.vue';

const { t } = useI18n();

useHead({
	title: t('breadcrumbs.static-map')
});
</script>