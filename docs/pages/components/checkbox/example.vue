<template>
	<ui-checkbox v-model="checked" value="1" name="myCheckbox">
		Checkbox {{checked ? '(checked)' : ''}}
	</ui-checkbox>
</template>

<script setup>
	const checked = ref(0);
</script>