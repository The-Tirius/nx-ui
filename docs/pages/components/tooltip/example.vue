<template>
	<ui-grid grid-template-columns="1fr 1fr" gap="var(--space-default)">
		<ui-checkbox v-model="showTooltip">
			Show tooltip
		</ui-checkbox>

		<div>
			<div class="tooltip-output">
				<ui-tooltip v-model="showTooltip">Hello world</ui-tooltip>
			</div>
		</div>
	</ui-grid>
</template>

<script setup>
const showTooltip = ref(false);
</script>

<style lang="less">
.tooltip-output {
	position: relative;
	height: var(--input-height-default);
	width: var(--input-height-default);
	background:  var(--color-primary);
	border-radius: var(--border-radius);
}
</style>