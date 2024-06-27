<template>
	<section>
		<section-title>ui-filter</section-title>

		<component-preview title="Example" :example="ExampleRaw">
			<template #description>
				<helper-typography>
					<p>
						Filter component example.
					</p>
					<p>
						Can work as a "checkbox" or a "radio button". For a "checkbox" mode pass an array to v-model. v-model="['1']"
					</p>
				</helper-typography>
			</template>
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
	title: t('breadcrumbs.filter')
});
</script>