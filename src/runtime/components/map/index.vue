<template>
	<section class="component-ui-map">
		<component :is="mapEngine" @initialized="emit('initialized', $event)">
			<slot :store="store"></slot>
			<div class="slot-row">
				<slot name="row" :store="store"></slot>
			</div>
		</component>
	</section>
</template>

<script setup>
import { useMapStore } from './store';
import comProps from '#build/ui.map.mjs';

// Data
const store = useMapStore();
const emit = defineEmits('initialized');

const props = defineProps({
	engine: {
		default: 'openlayers',
		type: String
	},
	height: {
		default: '400px',
		type: String
	},
	maxHeight: {
		default: 'none',
		type: String
	},
	coord: {
		default() { return [13.689167, 47.394167] }, // Riga
		type: Array,
	},
	zoom: {
		default: comProps.zoom,
		type: [Number, String],
	},
	zoomMin: {
		default: comProps.zoomMin,
		type: [Number, String],
	},
	zoomMax: {
		default: comProps.zoomMax,
		type: [Number, String],
	},
	deviceZoom: {
		default: false,
		type: Boolean
	},
	markers: {
		default: () => [],
		type: Array
	},
	disabledMarkers: {
		default: () => [],
		type: Array
	},
	markerImage: {
		default: '',
		type: String
	},
	markerActiveImage: {
		default: '',
		type: String
	},
	markerDisabledImage: {
		default: '',
		type: String
	},
});

store.setCoord(props.coord);
store.setZoom(props.zoom);
store.setZoomMin(props.zoomMin);
store.setZoomMax(props.zoomMax);
store.setDeviceZoom(props.deviceZoom);
store.setMarkers(props.markers);
store.setMarkerImage(props.markerImage);
store.setMarkerActiveImage(props.markerActiveImage);
store.setMarkerDisabledImage(props.markerDisabledImage);

watch(() => props.disabledMarkers, (v) => {
	store.setDisabledMarkers(v);
}, {immediate: true});

const mapEngine = computed(() => {
	return defineAsyncComponent(() => import(`./${props.engine}/index.vue`));
});
</script>

<style lang="less">
@com-content-width: var(--ui-content-width);

@com-space-default: var(--ui-space-default);
@com-space-mini: var(--ui-space-mini);

.component-ui-map {
	--ui-map-padding: @com-space-default;

	position: relative;
	height: v-bind(height);
	max-height: v-bind(maxHeight);

	.component-ui-map-engine {
		position: absolute;
		inset: 0;
	}

	.slot-row {
		pointer-events: none; 

		position: relative;
		margin: 0 auto;
		padding: 0 @com-space-default;
		width: 100%;
		max-width: @com-content-width;
		min-width: 320px;

		height: 100%;

		* {
			pointer-events: auto; 
		}
	}
}

@media only screen and (max-width: 620px) {
	.component-ui-map {
		--ui-map-padding: @com-space-mini;
	}
}
</style>