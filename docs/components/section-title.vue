<template>
	<section class="component-section-title">
		<slot />
	</section>
</template>

<style lang="less">
.component-section-title {
	padding-bottom: var(--space-big);

	font-weight: bold;
	font-size: var(--text-big);
	color: var(--color-header-text);
}
</style>