<template>
	<section class="component-bar-breadcrumbs">
		<ul itemscope itemtype="https://schema.org/BreadcrumbList">
			<li v-for="(item, index) in $breadcrumbs.value" 
				:key="item.name" 
				itemprop="itemListElement" 
				itemtype="https://schema.org/ListItem"
				itemscope
			>
				<span v-if="item.last">{{ $t(item.text) }}</span><!--
				--><nuxt-link v-if="!item.last && item.url !== false" :to="localePath(item.url)" itemprop="item" :class="{'tag-last': item.last}">
					<span itemprop="name">{{ $t(item.text) }}</span>
				</nuxt-link><meta itemprop="position" :content="index + 1" /><!--
			--></li>
		</ul>
	</section>
</template>

<script>
export default {
	name: 'component-bar-breadcrumbs',

	// Data
	setup() {
		const localePath = useLocalePath();

		return {
			localePath
		};
	},
}
</script>

<style lang="less">
.component-bar-breadcrumbs {
	position: relative;

	a {
		color: @color-primary;
	}

	li {
		position: relative;
		display: inline-block;
		margin-right: 20px;
		padding-right: 15px;
		line-height: 1.7;

		&:after {
			content: '/';

			position: absolute;
			left: 100%;
			width: 20px;
			height: 20px;
			line-height: 20px;
			text-align: left;
		}
	}

	li:last-child {
		margin-right: 0;
		padding-right: 0;
		//font-weight: 500;

		&:after {
			display: none;
		}
	}
}
</style>