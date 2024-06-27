<template>
	<section class="component-lang-switcher">
		<nuxt-link 
			v-for="locale in locales" 
			:key="locale.code"
			:to="switchLocalePath(locale.code)"
		>
			{{ locale.code }}
		</nuxt-link>
	</section>
</template>

<script setup>
	const { locale, locales } = useI18n();
	const switchLocalePath = useSwitchLocalePath();

	watch(locale, (v) => {
		console.log('watch', v);
	});
</script>

<style lang="less">
.component-lang-switcher {
	a {
		opacity: 0.5;
		margin-right: @space-default;
		text-transform: uppercase;


		&.router-link-active {
			opacity: 1;
			font-weight: bold;
		}
	}
}
</style>