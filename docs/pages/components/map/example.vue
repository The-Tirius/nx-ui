<template>
	<ui-map
		height="60vh" 
		max-height="1000px" 
		:zoom="8" 
		:zoomMin="1" 
		:zoomMax="18" 
		:coord="[24.106389, 56.948889]"
		:markers="markers" 
		:disabledMarkers="disabledMarkers"
		markerImage="/map-marker-violet.png"
		markerActiveImage="/map-marker-green.png" 
		markerDisabledImage="/map-marker-gray.png" 
		@wheel="onMouseWheel" 
		@initialized="onMapInitialized"
	>
		<template #row="{ store }">
			<ui-map-zoom :store="store">
				<ui-map-device-zoom-switch :store="store">
					<ui-tooltip v-if="!store.deviceZoom" v-model="showZoomTooltip" location="left"
						textColor="var(--color-secondary)" bg="var(--color-bg)"
					>
						"Click to enable mouse wheel or touch manipulations"
					</ui-tooltip>
				</ui-map-device-zoom-switch>
			</ui-map-zoom>

			<ui-map-location _showDefaultSlot="store.selectedMarker">
				<template #header>
					<ui-map-location-list v-model="selectedCity" :options="cities" label="City" />
					<ui-map-location-nearest icon="ic ic-location-crosshairs" label="Find nearest department" />
				</template>

				<template #default>
					<Transition name="slideup">
						<div
							v-if="store.selectedMarker" 
							class="map-marker-info"
							:data="store.selectedMarker"
							map-layout
							@click="store.setSelectedMarker(null)" 
						>
							<p>Example output of marker info:</p>
							<pre>{{ store.selectedMarker }}</pre>
						</div>
					</Transition>
				</template>
			</ui-map-location>
		</template>
	</ui-map>
</template>

<script setup>
const markers = [
{
        "id": "czxauig00",
        "name": "Centrālā laboratorija",
        "address": "Šarlotes iela 1B, Rīga, Rīgas 1. slimnīca",
        "city": "riga",
        "coord": [
            24.12778506,
            56.96157621
        ],
    },
    {
        "id": "cfla5iiz9",
        "name": "A. Dombrovska filiāle",
        "address": "A. Dombrovska iela 26, Rīga",
        "city": "riga",
        "coord": [
            24.1081432,
            57.0314181
        ],
    },
    {
        "id": "l7p95h4b8",
        "name": "Āgenskalna filiāle",
        "address": "Nometņu iela 60, Rīga, Āgenskalna doktorāts",
        "city": "riga",
        "coord": [
            24.071860755676,
            56.937342828933
        ],
    },
    {
        "id": "f1hvfze6b",
        "name": "VCA Aura filiāle",
        "address": "Nīcgales iela 5, Rīga, VCA Aura",
        "city": "riga",
        "coord": [
            24.177260841125,
            56.958010529539
        ]
    },
];

const disabledMarkers = ref([]);

const cities = ref([
	{
        "value": "all",
        "name": "...",
        "lat": 56.948889,
        "lon": 24.106389,
		"zoom": 8
    },
    {
        "value": "riga",
        "name": "Rīga",
        "lat": 56.9496,
        "lon": 24.1052,
		"zoom": 12
    },
	{
        "value": "adazi",
        "name": "Ādaži",
        "lat": 57.0707,
        "lon": 24.3181
    },
    {
        "value": "aizpute",
        "name": "Aizpute",
        "lat": 56.7227,
        "lon": 21.6015
    },
    {
        "value": "aluksne",
        "name": "Alūksne",
        "lat": 57.4215,
        "lon": 27.0433
    },
]);

const selectedCity = ref(null);
const showZoomTooltip = ref(false);

// Methods
function onMouseWheel() {
	console.log('map: onMouseWheel');
}

function onMapInitialized() {
	console.log('map: onMapInitialized');
}
</script>

<style>
.map-marker-info {
	overflow: auto;
	padding: var(--space-default);
	background: var(--color-surface);
	border-radius: var(--ui-border-radius-default);
}
</style>