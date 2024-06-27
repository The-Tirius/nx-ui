<template>
	<ui-grid grid-template-columns="2fr 1fr">
		<div>
			<ui-loading :active="!!loading">Loading</ui-loading>
		</div>
		<ui-grid>
			<ui-checkbox v-model="loading">Enable</ui-checkbox>
		</ui-grid>
	</ui-grid>
</template>

<script setup>
const loading = ref(1);
</script>