<template>
	<section class="component-theme-switcher">
		<span class="light" @click="$colorMode.preference = 'light'">
			Light
		</span>
		<span class="dark" @click="$colorMode.preference = 'dark'">
			Dark
		</span>
	</section>
</template>

<style lang="less">
.component-theme-switcher {
	span {
		opacity: 0.5;
		margin-right: @space-default;
		text-transform: uppercase;
		color: var(--color-primary-text);
		cursor: pointer;
	}
}

html.theme-light .component-theme-switcher .light {
	opacity: 1;
	font-weight: bold;
}

html.theme-dark .component-theme-switcher .dark {
	opacity: 1;
	font-weight: bold;
}
</style>