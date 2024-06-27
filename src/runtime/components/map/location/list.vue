<template>
	<section class="component-ui-map-location-list">
		<ui-select v-model="model" :options="options" :label="label" block />
	</section>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMapStore } from '../store';

const model = defineModel();
const props = defineProps({
	options: {
		default: () => [],
	},
	label: {
		default: '',
	}
});
const store = useMapStore();

const selectedCity = computed(() => {
	let cityData = null;

	for (let item of props.options) {
		if (item.value === model.value) {
			cityData = item;
			break;
		}
	}

	return cityData;
});

watch(model, (v) => {
	if (selectedCity.value) {
		store.setSelectedMarker(null);
		store.setCoord([selectedCity.value.lon, selectedCity.value.lat]);
		store.setZoom(selectedCity.value?.zoom ? selectedCity.value.zoom : 14);
	}
});
</script>

<style lang="less">
@com-color-bg: var(--ui-color-bg);

.component-ui-map-location-list {
	.component-ui-select {
		.value {
			background: @com-color-bg;
		}
	}
}
</style>