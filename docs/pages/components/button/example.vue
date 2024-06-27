<template>
	<ui-grid grid-template-columns="2fr 1fr">
		<div>
			<UiButton 
				:color="color" 
				:size="size" 
				:disabled="disabled" 
				:block="block"
				:loading="loading"
				:shape="shape"
				:variant="variant"
				@click="console.log('button click', e)"
				@comClick="console.log('button comClick', e)"
			>
				Button
			</UiButton>
		</div>
		<ui-grid>
			<ui-select v-model="color" :options="colorList" label="color"></ui-select>
			<ui-select v-model="size" :options="sizeList" label="size"></ui-select>
			<ui-select v-model="shape" :options="shapeList" label="shape"></ui-select>
			<ui-select v-model="variant" :options="variantList" label="variant"></ui-select>
			<ui-checkbox v-model="disabled">disabled</ui-checkbox>
			<ui-checkbox v-model="block">block</ui-checkbox>
			<ui-checkbox v-model="loading">loading</ui-checkbox>
		</ui-grid>
	</ui-grid>
</template>

<script setup>
const disabled = ref(false);
const block = ref(false);
const loading = ref(false);

const size = ref('default');
const sizeList = ref([
	{name: 'large', value: 'large'},
	{name: 'big', value: 'big'},
	{name: 'medium', value: 'medium'},
	{name: 'default', value: 'default'},
	{name: 'small', value: 'small'},
	{name: 'mini', value: 'mini'},
]);

const color = ref('primary');
const colorList = ref([
	{name: 'primary', value: 'primary'},
	{name: 'secondary', value: 'secondary'},
	{name: 'surface', value: 'surface'},
	{name: 'red', value: 'red'},
]);

const shape = ref('');
const shapeList = ref([
	{name: 'default', value: ''},
	{name: 'round', value: 'round'},
	{name: 'round-square', value: 'round-square'},
	{name: 'circle', value: 'circle'},
	{name: 'square', value: 'square'},
]);

const variant = ref('solid');
const variantList = ref([
	{name: 'solid', value: 'solid'},
	{name: 'flat', value: 'flat'},
	{name: 'outline', value: 'outline'},
]);
</script>