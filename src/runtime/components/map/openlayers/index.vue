<template>
	<div class="component-ui-map-openlayer component-ui-map-engine">
		<div class="map" ref="refMap"></div>
		<slot />
	</div>
</template>

<script setup>
// import 'ol/ol.css';

// Imports
	// Pinia store
	import { storeToRefs } from 'pinia';
	import { useMapStore } from '../store';

	// Openlayers
	import Feature from 'ol/Feature.js';
	import Point from 'ol/geom/Point.js';
	import {
		Circle as CircleStyle,
		Fill,
		Style,
		Text,
		Icon
	} from 'ol/style.js';
	import { Cluster, OSM, Vector as VectorSource } from 'ol/source.js';
	import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
	import { boundingExtent } from 'ol/extent.js';


	import Map from 'ol/Map.js';
	import View from 'ol/View.js';
	import { fromLonLat } from 'ol/proj.js';
	import {
		defaults as defaultInteractions,
		MouseWheelZoom as mouseWheelZoomInteraction,
		DragPan
	} from 'ol/interaction.js';
	import { platformModifierKeyOnly } from 'ol/events/condition.js';
	import Kinetic from 'ol/Kinetic.js';


// Data
	const emit = defineEmits('initialized');
	const refMap = ref(null);
	let map = null;
	let view = null;
	let interactions = null;
	let mouseWheelInt = null;
	let initialized = false;
	let features = [];
	let cluster = null;

	// Store
	const store = useMapStore();
	const {
		coord,
		zoom,
		zoomMin,
		zoomMax,
		deviceZoom,
		markers,
		disabledMarkers,
		markerImage,
		markerActiveImage,
		markerDisabledImage,
		selectedMarker
	} = storeToRefs(store);

	watch(() => selectedMarker.value, (v) => {
		redrawMarkers();
	});

	watch(() => disabledMarkers.value, (v) => {
		redrawMarkers();
	});

	// Watch coord
	watch(coord, (v) => { view.setCenter(fromLonLat(v)); });

	// Watch zoom
	watch(zoom, (v) => {
		const currentZoom = view.getZoom();

		if (currentZoom === v) return;

		if (initialized)
			view.animate({
				zoom: v,
				duration: 300
			});
		else
			view.setZoom(v);
	});

	const payload = {
		store,
	};

// Methods
	function getMarkerData(id) {
		let result = null;

		if (id !== null) {
			for (let item of markers.value) {
				if (item.id === id) {
					result = item;
					break;
				}
			}
		}

		return result;
	}

	/** Forced markers redraw */
	async function redrawMarkers() {
		await cluster.setStyle(cluster.getStyle());
	}

	/**
	 * Create markers
	 * @returns {array} - features array (markers)
	 */
	function createMarkers() {
		const result = [];

		for (let item of markers.value) {
			const feature = new Feature(new Point(fromLonLat(item.coord)));

			feature.attributes = { id: item.id }; // Add payload data to markers
			result.push(feature);
		}

		return result;
	}

	/**
	 * Create cluster
	 * @property {array} - features array (markers)
	 * @returns {VectorLayer} - Open Layers VectorLayer that work as cluster
	 */
	function createCluster(features) {
		const clusterSource = new Cluster({
			distance: 30,
			minDistance: 15,
			source: new VectorSource({
				features // Markers
			})
		});

		const styleCache = {};

		// Cache markers
		if (markerImage.value) {
			styleCache.default = new Style({
				image: new Icon({ src: markerImage.value })
			});

			if (markerActiveImage.value) {
				styleCache.active = new Style({
					image: new Icon({ src: markerActiveImage.value })
				});
			} else {
				styleCache.active = styleCache.default;
			}

			if (markerDisabledImage.value) {
				styleCache.disabled = new Style({
					image: new Icon({ src: markerDisabledImage.value })
				});
			} else {
				styleCache.disabled = styleCache.default;
			}
		} else {
			styleCache.default = new Style({
				image: new CircleStyle({
					radius: 14,
					fill: new Fill({ color: 'red' })
				})
			});
			styleCache.active = new Style({
				image: new CircleStyle({
					radius: 14,
					fill: new Fill({ color: 'green' })
				})
			});
			styleCache.disabled = new Style({
				image: new CircleStyle({
					radius: 14,
					fill: new Fill({ color: 'gray' })
				})
			});
		}

		// Markers style function
		function style(feature) {
			const allFeatures = feature.get('features');
			const size = allFeatures.length;

			let style;

			// If one
			if (size == 1) {
				const markerId = allFeatures[0].attributes.id;
				const isDisabled = disabledMarkers.value.includes(markerId);
				const isSelected = markerId === selectedMarker.value?.id;

				style = styleCache[isSelected ? 'active' : (isDisabled ? 'disabled' : 'default')];
			// If cluster
			} else {
				// Have cache
				if (styleCache[size]) {
					style = styleCache[size];
				// No cache
				} else {
					style = new Style({
						image: new CircleStyle({
							radius: 14,
							fill: new Fill({
								color: '#4b3aaa',
							}),
						}),
						text: new Text({
							font: '14px Arial, sans-serif',
							text: size.toString(),
							fill: new Fill({
								color: '#fff',
							}),
						}),
					});

					styleCache[size] = style;
				}
			}

			return style;
		}

		return new VectorLayer({
			source: clusterSource,
			style
		});
	}

	/** Init map */
	function initMap() {
		features = createMarkers();

		cluster = createCluster(features);

		const raster = new TileLayer({
			source: new OSM(),
		});

		view = new View({
			center: fromLonLat(coord.value),
			zoom: zoom.value,
			minZoom: zoomMin.value,
			maxZoom: zoomMax.value,
			enableRotation: false,
		});

		interactions = defaultInteractions({
			mouseWheelZoom: false,
			dragPan: false
		});

		interactions.extend([
			new DragPan({
				kinetic: new Kinetic(-0.005, 0.05, 100),
				condition(e) {
					if (e.originalEvent.pointerType !== 'touch') return true;

					return deviceZoom.value || this.getPointerCount() === 2;
					//return this.getPointerCount() === 2 || platformModifierKeyOnly(event);
				},
			})
		]);

		// Create map
		map = new Map({
			layers: [raster, cluster],
			target: refMap.value,
			interactions,
			view,
			projection: 'EPSG:3857',
			controls: []
		});

		// Add mouse wheel interaction
		mouseWheelInt = new mouseWheelZoomInteraction({
			condition(e) {
				return deviceZoom.value || platformModifierKeyOnly(e);
			}
		});
		map.addInteraction(mouseWheelInt);

		// Watch map zoom
		let t;
		view.on('change:resolution', (e) => {
			clearTimeout(t);
			t = setTimeout(() => {
				store.setZoom(view.getZoom());
			}, 50);
		});

		initialized = true;

		// Handle map marker click
		map.on('click', (e) => {
			cluster.getFeatures(e.pixel).then((clickedFeatures) => {
				let clickedOnMarker = false;

				if (clickedFeatures.length) {
					const features = clickedFeatures[0].get('features'); // Get clustered Coordinates

					if (features.length > 1) {
						// Zoom in
						const extent = boundingExtent(
							features.map((r) => r.getGeometry().getCoordinates()),
						);

						map.getView().fit(extent, { duration: 1000, padding: [100, 150, 100, 150] });
					// Save marker id if clicked on marker
					} else if (features.length == 1) {
						store.setSelectedMarker(getMarkerData(features[0].attributes.id));
						clickedOnMarker = true;
					}
				}

				if (!clickedOnMarker) store.setSelectedMarker(null);
			});
		});

		map.on('loadend', () => { emit('initialized', payload); });
	}

// Hooks
	onMounted(() => {
		initMap();
	});
</script>

<style lang="less">
.component-ui-map-openlayer {
	position: relative;

	.map {
		position: absolute;
		inset: 0;
		background: #add19e;
	}
}
</style>