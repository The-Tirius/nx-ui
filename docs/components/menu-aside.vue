<template>
	<section class="component-menu-aside">
		<ul class="menu">
			<li v-for="item of menu">
				<nuxt-link :to="item.url" class="category">{{ item.name }}</nuxt-link>

				<ul v-if="item?.items" class="submenu">
					<li v-for="subItem of item.items">
						<nuxt-link :to="subItem.url" noPrefetch>{{ subItem.name }}</nuxt-link>
					</li>
				</ul>
			</li>
		</ul>
	</section>
</template>

<script setup>
import components from '~/assets/components.json';

// Data
const props = defineProps([

]);

const menu = [
	{
		name: 'Components',
		url: '/components',
		items: components
	}
];
</script>

<style lang="less">
.component-menu-aside {
	.menu {
		// li {
		// 	padding-bottom: var(--space-small);
		// }

		.category {
			display: block;
			font-weight: bold;
			color: var(--color-header-text);
			padding-bottom: var(--space-small);
		}

		.submenu {
			position: relative;
			
			&:before {
				content: '';

				position: absolute;
				left: 3px;
				top: 0;
				bottom: 0;
				width: 1px;

				background: var(--color-border);
			}

			li {
				padding-left: var(--space-default);
			}

			a {
				&:before {
					content: '';

					opacity: 0;
					transform: translateY(-50%);
					position: absolute;
					left: calc(calc(var(--space-default) * -1) + 3px);
					top: 50%;

					width: 1px;
					height: 26px;

					background: var(--color-primary-text);
				}
			}
		}

		a {
			position: relative;
			display: block;
			color: var(--color-gray-text);
			padding: var(--space-mini) 0;
			//background: cadetblue;

			&:hover {
				color: var(--color-primary-text);
			}
		}

		a.router-link-exact-active {
			font-weight: bold;
			color: var(--color-primary-text);

			&:before {
				opacity: 1;
			}
		}
	}
}
</style>