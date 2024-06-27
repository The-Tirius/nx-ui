<template>
	<ui-grid grid-template-columns="2fr 1fr">
		<div>
			<ui-grid :gridTemplateColumns="{'default': '1fr 1fr 1fr 1fr', '1000px': '1fr'}">
				<ui-radio v-model="selected" name="radio" value="1" :disabled="disabled">Option 1</ui-radio>
				<ui-radio v-model="selected" name="radio" value="2" :disabled="disabled">Option 2</ui-radio>
				<ui-radio v-model="selected" name="radio" value="3" :disabled="disabled">Option 3</ui-radio>
				<ui-radio v-model="selected" name="radio" value="4" :disabled="disabled">Option 4</ui-radio>
			</ui-grid>
			<div>Selected: {{ selected }}</div>
		</div>
		<ui-grid>
			<ui-checkbox v-model="disabled">Disabled</ui-checkbox>
		</ui-grid>
	</ui-grid>
</template>

<script setup>
const selected = ref('1');
const disabled = ref(false);
</script>