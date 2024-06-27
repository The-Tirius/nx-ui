<template>
	<section class="component-ui-map-location-nearest" @click="handleClick">
		<i v-if="icon" class="icon" :class="icon"></i>
		<span class="label"><span>{{ label }}</span></span>
	</section>
</template>

<script setup>
const props = defineProps({
	label: {
		required: true,
		type: String
	},
	icon: {
		required: true,
		type: String
	},
});

function getPosition() {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}

async function handleClick() {
	let pos = null;

	try {
		pos = await getPosition();
	} catch (err) {
		console.log('handleClick err', err);
	}
}
</script>

<style lang="less">
@import url(../../styles/mixins.less);

@com-height: var(--ui-input-height-default);

@com-border-radius-default: var(--ui-border-radius-default);
@com-space-default: var(--ui-space-default);
@com-space-mini: var(--ui-space-mini);
@com-space-micro: var(--ui-space-micro);

@com-text-medium: var(--ui-text-medium);
@com-text-small: var(--ui-text-small);

@com-color-bg: var(--ui-color-bg);
@com-color-primary: var(--ui-color-primary);

.component-ui-map-location-nearest {
	height: @com-height;
	background: @com-color-bg;
	border-radius: @com-border-radius-default;

	display: flex;
	cursor: pointer;

	.icon {
		flex: 0 0 38px;
		line-height: @com-height;
		font-size: @com-text-medium;
		color: @com-color-primary;
	}

	.label {
		display: flex;
		padding-right: @com-space-micro;
		align-items: center;
		line-height: 1.1;
		font-size: @com-text-small;

		span {
			.mix-miltiline-text-overflow(2);
		}
	}
}

// @media only screen and (max-width: 390px) {
// 	.component-ui-map-location-nearest {
// 		.icon {
// 			flex-basis: 32px;
// 		}
// 	}
// }
</style>