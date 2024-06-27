<template>
	<ui-grid grid-template-columns="2fr 1fr">
		<div>
			<ui-input 
				placeholder="Enter text..."
				v-model="value"
				:shape="shape"
				:size="size"
				:disabled="disabled"
			>
			</ui-input>
		</div>

		<ui-grid>
			<ui-select v-model="size" :options="sizeList" label="size"></ui-select>
			<ui-select v-model="shape" :options="shapeList" label="shape"></ui-select>
			<ui-checkbox v-model="disabled">disabled</ui-checkbox>
		</ui-grid>
	</ui-grid>
</template>

<script setup>
const value = ref('');
const disabled = ref(false);

const size = ref('default');
const sizeList = ref([
	{name: 'large', value: 'large'},
	{name: 'big', value: 'big'},
	{name: 'medium', value: 'medium'},
	{name: 'default', value: 'default'},
	{name: 'small', value: 'small'},
	{name: 'mini', value: 'mini'},
]);

const shape = ref('');
const shapeList = ref([
	{name: 'default', value: ''},
	{name: 'round', value: 'round'},
	{name: 'round-square', value: 'round-square'},
	{name: 'square', value: 'square'},
]);
</script>