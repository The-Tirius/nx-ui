<template>
	<section class="component-ui-accordion">
		<div v-for="(item, index) of list" class="item" :class="{'tag-active': activeItem === index}">
			<div class="header" @click="toggle(index)">
				<i class="icon"></i>
				<div class="title">{{ item.title }}</div>
				<div class="btn-toggle"></div>
			</div>
			<div class="text">
				<div v-html="item.text"></div>
			</div>
		</div>
	</section>
</template>

<script setup>
// Imports
	import { ref, computed } from 'vue'

// Data
	const props = defineProps({
		/** Icon for light theme */
		iconLight: {
			type: String,
		},
		/** Icon for dark theme */
		iconDark: {
			type: String,
		},
		/**
		 * Accordion elements list, AccordionListItem = {title: '', text: ''}
		 * @values AccordionListItem[]
		 */
		list: {
			type: Array,
		},
		/**
		 * Slide that is active(open) by default, null = all closed
		 * @values 1, 2, 3, 1000, null
		 */
		active: {
			type: [Number, null],
			default: 0
		}
	});

	const activeItem = ref(props.active);

	const iconLightComputed = computed(() => {
		return props.iconLight ? `url(${props.iconLight})` : 'none';
	});

	const iconDarkComputed = computed(() => {
		return props.iconDark ? `url(${props.iconDark})` : 'none';
	});

// Methods
	function toggle(i) {
		activeItem.value = activeItem.value === i ? null : i;
	}
</script>

<style lang="less">
@import (less) './styles/components.less';

// Misc
@com-icon-size: 30px;
@com-btn-size: 20px;
@com-btn-width: 2px;

@com-ani-time: var(--ui-ani-time);
@com-ani-ease: var(--ui-ani-ease);

@com-text-line-height: var(--ui-text-line-height);

// Padding
@com-space-default: var(--ui-space-default);
@com-space-small: var(--ui-space-small);
@com-space-mini: var(--ui-space-mini);

// Colors
@com-color-border: var(--ui-color-border);
@com-color-header-text: var(--ui-color-header-text);

// Text
@com-text-medium: var(--ui-text-medium);
@com-text-default: var(--ui-text-default);

// Font
@com-font-header: var(--ui-font-header);

.component-ui-accordion {
	.item {
		padding-bottom: @com-space-small;
		margin-top: @com-space-small;
		border-bottom: 1px solid @com-color-border;
		font-size: @com-text-medium;

		&:last-child {
			border-bottom: none;
		}

		// Active state
		&.tag-active {
			.text {
				grid-template-rows: 1fr;
			}

			.btn-toggle {
				&:before,
				&:after {
					transform: rotate(90deg);
				}
				&:after {
					opacity: 0;
				}
			}
		}
	}

	.header {
		position: relative;
		padding: @com-space-small 40px @com-space-small calc(@com-icon-size + @com-space-default);
		margin-bottom: @com-space-mini;
		cursor: pointer;
	}

	.icon,
	.btn-toggle {
		transform: translateY(-50%);
		position: absolute;
		top: 50%;
		width: @com-icon-size;
		height: @com-icon-size;
		line-height: @com-icon-size;
		text-align: center;
	}

	.icon {
		left: 0;
		background-position: center;
		background-size: contain;
	}

	.title {
		font-family: @com-font-header;
		font-weight: 600;
		color: @com-color-header-text;
	}

	.btn-toggle {
		right: 0;

		&:before,
		&:after {
			content: '';

			transition: all @com-ani-time @com-ani-ease;
			transform-origin: center;
			position: absolute;
			background: @com-color-header-text;
		}

		// |
		&:before {
			top: (@com-icon-size/2) - (@com-btn-size / 2);
			left: (@com-icon-size/2) - (@com-btn-width / 2);
			width: @com-btn-width;
			height: @com-btn-size;
		}

		// —
		&:after {
			top: (@com-icon-size/2) - (@com-btn-width / 2);
			left: (@com-icon-size/2) - (@com-btn-size / 2);
			width: @com-btn-size;
			height: @com-btn-width;
		}
	}

	.text {
		transition: grid-template-rows @com-ani-time @com-ani-ease;
		display: grid;
		grid-template-rows: 0fr;
		line-height: @com-text-line-height;
		font-size: @com-text-default;

		div {
			overflow: hidden;
		}
	}
}

// Themes settings
.theme-light .component-ui-accordion .icon,
.theme-lowvision .component-ui-accordion .icon {
	background-image: v-bind(iconLightComputed);
}

.theme-dark .component-ui-accordion .icon {
	background-image: v-bind(iconDarkComputed);
}


@media only screen and (max-width: 500px) {
	.component-ui-accordion {
		.item {
			font-size: @com-text-default;
		}

		.header {
			padding: @com-space-small 35px @com-space-small calc(26 + @com-space-default);
		}

		.icon {
			width: 26px;
			height: 26px;
		}
	}
}
</style>