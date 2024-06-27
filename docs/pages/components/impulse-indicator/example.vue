<template>
	<div class="impulse-example" @click="onClick">
		<ui-impulse-indicator :impulse="impulse"  />
		<span>👇</span>
	</div>
</template>

<script setup>
const impulse = ref(false);

function onClick(e) {
	impulse.value = {
		left	: e.layerX,
		top		: e.layerY,
		width	: e.target.offsetWidth,
		height	: e.target.offsetHeight
	};
}
</script>

<style lang="less">
.impulse-example {
	display: grid;
	place-items: center;

	position: relative;
	height: 100px;
	
	font-size: var(--text-medium);
	font-family: var(--font-header);

	color: var(--color-text-on-primary);
	background: var(--color-primary);
	border-radius: var(--border-radius);

	cursor: pointer;
}
</style>