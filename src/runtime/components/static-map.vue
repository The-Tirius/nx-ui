<template>
	<a class="component-static-map"
		:href="'https://maps.google.com/maps?q=' + encodeURI(address)"
		target="_blank"
		ref="refMap"
		rel="noreferrer"
		aria-label="Map"
		:class="classes"
		@mousemove="mousemove"
		@mouseover="mouseover"
		@mouseout="mouseout"
	>
		<span class="map-wrapper" :style="mapWrapperStyles">
			<span class="image" :style="{'background-image': 'url('+ mapImagePath +')'}" v-if="mapImagePath"></span>
			<i class="marker"></i>
		</span>
	</a>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import isMobileDevice from './helpers/isMobileDevice';
import isWebKit from './helpers/isWebKit';
import getEventCoord from './helpers/getEventCoord';
import isImageExist from './helpers/isImageExist';

// Data
	const props = defineProps({
		image: {
			required: true,
			type: String,
		},
		imageNotFound: {
			required: false,
			type: String,
		},
		address: {
			required: true,
			type: String,
		},
		enableZoom: {
			required: false,
			type: Boolean,
			default: true
		},
		initialZoom: {
			required: false,
			type: [Number, String, Boolean],
			default: false,
		},	
	});

	const enableMapMovement = ref(false);
	const isMobileDeviceCached = ref(false);
	const isWebKitCached = ref(false);
	const noMapImage = ref(true);
	const initialized = ref(false);

	let mouseUpdateTime = 0;
	let webKitMouseUpdateRate = 50;
	let mapImagePath = ref('');
	const refMap = ref(null);

	const mapOffset = reactive({
		x: 0,
		y: 0
	});

	let timeoutMapMovement = null;

	// Computed
	const classes = computed(() => {
		return [
			initialized.value ? 'tag-initialized' : '',
			props.enableZoom ? 'tag-enable-zoom' : '',
			noMapImage.value ? 'tag-no-image' : '',
			props.initialZoom ? ('tag-initial-zoom-' + props.initialZoom) : '',
		];
	});

	const mapWrapperStyles = computed(() => {
		const result = {};

		if (props.enableZoom && enableMapMovement.value && !isMobileDeviceCached.value) {
			result['-webkit-transform'] = `translate3d(${mapOffset.x}%, ${mapOffset.y}%, 0)`;
			result['transform'] = `translate3d(${mapOffset.x}%, ${mapOffset.y}%, 0)`;
		}

		return result;
	});

// Methods
	async function loadImage() {
		let result = props.imageNotFound ? props.imageNotFound : '';
		let exist = await isImageExist(props.image);

		if (exist) {
			result = props.image;
			noMapImage.value = false;
		}

		mapImagePath.value = result;
		initialized.value = true;
	}

	function mousemove(e) {
		if (!props.enableZoom || isMobileDeviceCached.value) return;

		let coord = getEventCoord(e, refMap.value);

		let elWidth = refMap.value.offsetWidth;
		let elHeight = refMap.value.offsetHeight;

		let center = {
			x: elWidth/2,
			y: elHeight/2,
		};

		let computedCoord = {
			x: coord.x - center.x,
			y: coord.y - center.y,
		};

		let offset = {
			x: computedCoord.x * 100 / elWidth,
			y: computedCoord.y * 100 / elHeight,
		};

		// WebKit refuse to update styles when they change to rapidly >.<
		// This hack is made to fix this issue. Styles update bo faster than webKitMouseUpdateRate (ms)
		if (isWebKitCached.value) {
			let dateNow = Date.now();

			if (dateNow - mouseUpdateTime > webKitMouseUpdateRate) {
				mapOffset.x = offset.x * -1 *(0.5);
				mapOffset.y = offset.y * -1 *(0.5);
				mouseUpdateTime = dateNow;
			} else {
				((x, y) => {
					setTimeout(() => {
						mapOffset.x = x * -1 *(0.5);
						mapOffset.y = y * -1 *(0.5);
						mouseUpdateTime = Date.now();
					}, webKitMouseUpdateRate - dateNow - mouseUpdateTime);
				})(offset.x, offset.y);
			}
		} else {
			mapOffset.x = offset.x * -1 *(0.5);
			mapOffset.y = offset.y * -1 *(0.5);
		}
	}

	function mouseover() {
		if (!props.enableZoom || isMobileDeviceCached.value) return;

		clearTimeout( timeoutMapMovement );
		timeoutMapMovement = setTimeout(() => {
			enableMapMovement.value = true;
		}, 350);
	}

	function mouseout() {
		if (!props.enableZoom || isMobileDeviceCached.value) return;

		clearTimeout( timeoutMapMovement );
		timeoutMapMovement = setTimeout(() => {
			enableMapMovement.value = false;
		}, 5);
	}

// Hooks
	onMounted(() => {
		isMobileDeviceCached.value = isMobileDevice();
		isWebKitCached.value = isWebKit();

		loadImage();
	});
</script>

<style lang="less">
@com-surface: var(--ui-color-surface);

@keyframes ui-static-map-jump {
    0% {
		transform: translate3d(0, -30px, 0);
		opacity: 0;
	}
	40% {
		opacity: 1;
	}
	50% {
		transform: translate3d(0, 0, 0) scale(1.1, 0.9);
	}
	65% {
		transform: translate3d(0, -5px, 0) scale(0.95, 1.05);
	}
	80% {
		transform: translate3d(0, 0, 0) scale(1.05, 0.95);
	}
	100% {
		transform: translate3d(0, 0, 0) scale(1, 1);
		opacity: 1;
	}
}

.component-static-map {
	overflow: hidden;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	background-color: @com-surface;

	.map-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.image {
		transition: opacity 0.35s ease-in;
		opacity: 0;

		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.marker {
		transition: opacity 0.25s;
		opacity: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -35px 0 0 -35px;

		width: 70px;
		height: 70px;

		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAOVBMVEVHcEwAAgQAAAAgv1Egv1EfvVEAAAABBQofvFEgv1EgvlEAAAAfvlAgv1Eamk4fulAfvVAUZFsgv1GrD9dAAAAAEnRSTlMAMxA+lBIeKVDwsAfff5bEZmY1hHYFAAABW0lEQVRo3u2W246DIBRFD3coUB3//2OHsVaMoJnEzdtZjzZx5dy2JWIYBoyac86zGmjwr+XLyw8qIi1H0ohy9HJGoxWmdRSLGV0Hvpa+A2tRyxXA6adLScLdR31p0F55HeoD2L0cbvCzT+bwBCXpvLFa0GMP9S5MAI9+7i3svtSzlDI+l+TekPdleAvhnJUwier1sEgKTo6uBGG5n8kmEW7kdv1sEvFw+uHmToJ1m0SiMri9eB2jg0jUTXaVjZMQCU2XKTzRLnl6keZSYnaJxR39iVx+ixbSrVJK/7OVDoVEYBI3H1+LiZXLvxI6SmkFqFlrw9oNS8KJ7UYsYWgbtgeKQHxQTjl5SkZUr3onOX0VFuk4JO9fvnwVlrD4ZiAON43OH6G1Wc4S3lEbFlaFpCGo2iwbIw3ic/jvYVXUpEwj5n1umKfRqKyIYRiGYRiGYRiGYRiGYRjmn/wC1rQyrS6ERXEAAAAASUVORK5CYII=");
	}

	// No image
	&.tag-no-image {
		.image {
			background-size: contain;
		}

		.marker {
			display: none;
		}	
	}

	&.tag-initial-zoom-150 {
		.image {
			transform: scale(1.5);
		}
	}
	&.tag-initial-zoom-200 {
		.image {
			transform: scale(2);
		}
	}
	&.tag-initial-zoom-250 {
		.image {
			transform: scale(2.5);
		}
	}
	&.tag-initial-zoom-300 {
		.image {
			transform: scale(3);
		}
	}

	// Initialized
	&.tag-initialized {
		.image {
			opacity: 1;
		}

		.marker {
			animation-name: ui-static-map-jump;
			animation-delay: 0.35s;
			animation-duration: 1.25s;
			animation-iteration-count: 1;
			animation-fill-mode: forwards;
			animation-timing-function: ease-in;
		}
	}
}

@media (hover: hover) {
	.component-static-map.tag-enable-zoom {
		.map-wrapper {
			will-change: transform;
			transition: all 0.15s linear;
			transform: translate3d(0,0,0);
		}

		.image {
			transition: all 0.30s ease-in-out;
			transform-origin: center;
		}

		&:hover {
			.image {
				transform: scale(1.5);
			}
		}

		&.tag-initial-zoom-150:hover {
			.image {
				transform: scale(2.5);
			}
		}
		&.tag-initial-zoom-200:hover {
			.image {
				transform: scale(3);
			}
		}
		&.tag-initial-zoom-250:hover {
			.image {
				transform: scale(3.5);
			}
		}
		&.tag-initial-zoom-300:hover {
			.image {
				transform: scale(4);
			}
		}
	}
}
</style>