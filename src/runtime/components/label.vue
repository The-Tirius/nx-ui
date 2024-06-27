<template>
	<label class="component-ui-label">
		<span class="component-ui-label--text">{{ text }}</span>
		<slot></slot>
	</label>
</template>

<script setup>
const props = defineProps({
	text: {
		default: ''
	}
});
</script>

<style lang="less">
@com-space-micro: var(--ui-space-micro);
@com-font-weight-medium: var(--ui-font-weight-medium);
@com-text-medium: var(--ui-text-medium);
@com-color-header-text: var(--ui-color-header-text);

.component-ui-label {
	display: block;

	.component-ui-label--text {
		display: block;
		padding-bottom: @com-space-micro;
		font-weight: @com-font-weight-medium;
		font-size: @com-text-medium;
		color: @com-color-header-text;
	}
}
</style>