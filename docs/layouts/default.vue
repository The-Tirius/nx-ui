<template>
	<section id="layout-default">
		<bar-top />

		<div id="wrapper">
			<aside>
				<menu-aside />
			</aside>

			<main>
				<helper-breadcrumbs v-if="$currentPage.value !== 'index'" />
				<div class="page">
					<slot />
				</div>
			</main>
		</div>
	</section>
</template>

<script>
export default {
	name: 'layout-default'
}
</script>

<style lang="less">
#layout-default {

	#wrapper {
		display: grid;
		grid-template-columns: 300px auto;
		gap: var(--space-big);

		margin: 0 auto;
		padding: var(--space-default);
		max-width: var(--content-width);
	}

	aside {

	}

	main {
		overflow-x: hidden;
	}

	.page {
		margin-top: var(--space-big);
	}
}
</style>