/**
 * Map Coord
 * @typedef MapCoord
 * @type {array}
 * @property {string|number} 0 - Longitude
 * @property {string|number} 1 - Latitude
 */

/**
 * Map Marker
 * @typedef MapMarker
 * @type {object}
 * @property {MapCoord} coord
 */

import { defineStore } from 'pinia';

export const useMapStore = defineStore('map', {
    state: () => {
        return {
			coord: [],

			zoom: 8,
			zoomMin: 8,
			zoomMax: 18,

			deviceZoom: true, // enable/disable mouse wheel or gesture zoom

			markerImage: '',
			markerActiveImage: '',
			markerDisabledImage: '',
			markers: [],
			selectedMarker: null,
			disabledMarkers: []
		}
    },

	actions: {
		/**
		 * Set map zoom
		 * @param {number} v
		 */
		setZoom(v) {
			this.zoom = v;
		},

		/**
		 * Set min map zoom
		 * @param {number} v
		 */
		setZoomMin(v) {
			this.zoomMin = v;
		},

		/**
		 * Set max map zoom
		 * @param {number} v
		 */
		setZoomMax(v) {
			this.zoomMax = v;
		},

		/** Map zoom in */
		zoomIn() {
			if (this.zoom + 1 > this.zoomMax) {
				if (this.zoom !== this.zoomMax) this.zoom = this.zoomMax;

				return;
			}

			this.zoom++;
		},
		
		/** Map zoom out */
		zoomOut() {
			if (this.zoom - 1 < this.zoomMin) {
				if (this.zoom !== this.zoomMin) this.zoom = this.zoomMin;

				return;
			}

			this.zoom--;
		},

		/**
		 * Set map coord
		 * @param {MapCoord} v
		 */
		setCoord(v) {
			this.coord = v;
		},

		/**
		 * Enable/disable device zoom, if call withour params then toggle current state
		 *  @param {boolean=} v
		 */
		setDeviceZoom(v = null) {
			this.deviceZoom = v !== null ? v : !this.deviceZoom;
		},

		/**
		 * Set markers
		 *  @param {MapMarker[]} v
		 */
		setMarkers(v) {
			this.markers = v;
		},

		/**
		 * Set selected marker
		 *  @param {MapMarker} v
		 */
		setSelectedMarker(v) {
			this.selectedMarker = v;
		},

		/**
		 * Set disabled markers
		 *  @param {MapMarker[]} v
		 */
		setDisabledMarkers(v) {
			this.disabledMarkers = v;
		},

		/**
		 * Set marker image
		 *  @param {string} v
		 */
		setMarkerImage(v) {
			this.markerImage = v;
		},

		/**
		 * Set marker active image
		 *  @param {string} v
		 */
		setMarkerActiveImage(v) {
			this.markerActiveImage = v;
		},

		/**
		 * Set marker disabled image
		 *  @param {string} v
		 */
		setMarkerDisabledImage(v) {
			this.markerDisabledImage = v;
		},
	},

	getters: {
		/**
		 * Get marker by id
		 * @param {string|number} id 
		 * @returns MapMarker
		 */
		getMarker(state) {
			return (id) => {
				for (let item of state.markers) {
					if (item.id === id) return item;
				}

				return null;
			}
		}
	},
});