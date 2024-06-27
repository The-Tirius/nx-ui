<template>
	<component class="component-ui-card" :is="cardIs" :to="to">
		<div class="ui-card-icon" v-if="icon">
			<img :src="icon">
			<component v-if="iconTitle" :is="iconTitleIs" :to="iconLink" target="_blank" class="ui-card-icon-title">
				{{ iconTitle }}
			</component>
		</div>
		<div class="ui-card-title" v-if="title"><strong>{{ title }}</strong></div>
		<div class="ui-card-content" v-if="slots?.default">
			<slot></slot>
		</div>
		<div class="ui-card-footer" v-if="slots?.footer">
			<slot name="footer"></slot>
		</div>
	</component>
</template>

<script setup>
// Imports
	import { useSlots, resolveComponent } from 'vue';

//
const slots = useSlots()

const props = defineProps({
	to: {
		type: String,
		default: ''
	},
	icon: {
		type: String,
		default: ''
	},
	iconTitle: {
		type: String,
		default: ''
	},
	iconLink: {
		type: String,
		default: ''
	},
	title: {
		type: String,
		default: ''
	},
});

const cardIs = (props.to || props.href) ? resolveComponent('NuxtLink') : 'div';
const iconTitleIs = props.iconLink ? resolveComponent('NuxtLink') : 'b';
</script>

<style lang="less">
// Variables
@com-border-radius-default: var(--ui-border-radius-big);

// Text size
@com-text-default: var(--ui-text-default);
@com-text-small: var(--ui-text-small);

// Font family
@com-font-header: var(--ui-font-header);

// Color
@com-color-header-text: var(--ui-color-header-text);
@com-color-surface: var(--ui-color-surface);
@com-color-text: var(--ui-color-text);
@com-color-primary: var(--ui-color-primary);

// Padding
@com-space-default: var(--ui-space-default);
@com-space-micro: var(--ui-space-micro);
@com-space-mini: var(--ui-space-mini);

.component-ui-card {
	--ui-card-padding: @com-space-default;

	position: relative;

	color: @com-color-header-text;
	background: @com-color-surface;
	border-radius: @com-border-radius-default;

	.ui-card-icon {
		display: grid;
		grid-template-columns: 50px auto;
		gap: @com-space-default;
		align-items: center;
		padding: var(--ui-card-padding) 0 0 30px;
		height: 80px;

		font-family: @com-font-header;

		img {
			width: 100%;
			max-width: 50px;
			max-height: 50px;
		}

		a, b {
			padding-right: @com-space-mini;
			font-weight: 600;
			color: @com-color-header-text;
		}
	}

	.ui-card-title {
		display: block;
		padding: var(--ui-card-padding) var(--ui-card-padding) @com-space-micro var(--ui-card-padding);
		font-family: @com-font-header;

		strong {
			position: relative;

			&:before {
				content: '';

				position: absolute;
				bottom: 22%;
				right: -8px;

				width: 4px;
				height: 4px;
				border-radius: 50%;

				background: @com-color-primary;
			}
		}
	}

	.ui-card-content {
		padding: 0 var(--ui-card-padding) var(--ui-card-padding) var(--ui-card-padding);
		line-height: 1.5;
		font-size: @com-text-small;
		color: @com-color-text;
	}
}
</style>