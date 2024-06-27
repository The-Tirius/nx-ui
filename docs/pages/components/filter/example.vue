<template>
	<ui-grid>
		<ui-filter v-model="value" :items="items"></ui-filter>
		<div>
			selected: {{ value }}
		</div>
	</ui-grid>
</template>

<script setup>
	const value = ref(['1']);
	const items = ref([
		{name: 'Tokyo, Japan', value: '1'},
		{name: 'Delhi, India', value: '2'},
		{name: 'Shanghai, China', value: '3'},
		{name: 'São Paulo, Brazil', value: '4'},
		{name: 'Mumbai, India', value: '5'},
	]);
</script>