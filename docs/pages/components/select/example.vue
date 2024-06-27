<template>
	<ui-grid grid-template-columns="2fr 1fr">
		<div>
			<ui-select 
				v-model="city" 
				:options="citiesList" 
				label="Cities"
				:disabled="disabled"
				:block="block"
			></ui-select>
		</div>
		<ui-grid>
			<ui-checkbox v-model="disabled">disabled</ui-checkbox>
			<ui-checkbox v-model="block">block</ui-checkbox>
		</ui-grid>
	</ui-grid>
</template>

<script setup>
const city = ref('1');
const citiesList = ref([
	{name: 'Tokyo, Japan', value: '1'},
	{name: 'Delhi, India', value: '2'},
	{name: 'Shanghai, China', value: '3'},
	{name: 'São Paulo, Brazil', value: '4'},
	{name: 'Mumbai, India', value: '5'},
]);

const disabled = ref(false);
const block = ref(false);
</script>