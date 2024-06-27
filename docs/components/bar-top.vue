<template>
	<section class="component-bar-top">
		<div class="g-row">
			<nuxt-link :to="localePath('/')" class="logo">3</nuxt-link>
			
			<helper-theme-switcher />
			<helper-lang-switcher />
			<nav class="menu">
				<nuxt-link class="item" v-for="item in menuMain" :key="item.id" :to="localePath(item.id)">
					{{ $t(item.text) }}
				</nuxt-link>
			</nav>
		</div>
	</section>
</template>

<script setup>
	import { useGeneralStore } from '~/stores/generalStore';

	const { menuMain } = useGeneralStore();
</script>

<style lang="less">
.component-bar-top {
	.mix-clear;

	padding: @space-default 0;
	line-height: 50px;

	.logo {
		float: left;

		display: block;
		position: relative;
		padding-left: 100px;
		width: 100px;
		height: 50px;
		line-height: 40px;

		font-size: @text-small;

		color: var(--color-header-text);

		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;
	}

	.menu {
		float: right;
		margin-right: @space-large;

		a {
			opacity: 0.5;
			margin-right: @space-default;
		}

		a.router-link-active {
			opacity: 1;
			font-weight: bold;
		}
	}

	.component-lang-switcher {
		float: right;
		margin-right: @space-large;
	}

	.component-theme-switcher {
		float: right;
	}
}

.theme-light .component-bar-top .logo {
	background-image: url(/logo-light.svg);
}

.theme-dark .component-bar-top .logo {
	background-image: url(/logo-dark.svg);
}
</style>