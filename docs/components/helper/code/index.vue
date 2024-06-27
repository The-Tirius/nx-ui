<template>
	<section class="component-helper-code">
		<div ref="source" class="source">
			<slot />
		</div>

		<div class="output">
			<pre>{{ output }}</pre>
		</div>
	</section>
</template>

<script setup>
// Imports
	import fixIndents from './fixIndents';

// Data
	const source = ref(null);
	const output = ref('');

// Hooks
	onMounted(() => {
		const pre = source.value.querySelector('pre');
		const string = pre ? pre.innerHTML : '';

		output.value = fixIndents(string);
	});
</script>

<style lang="less">
.component-helper-code {
	margin-bottom: var(--space-default);
	padding: var(--space-default);
	background: var(--color-surface);
	border-radius: var(--border-radius);

	.source {
		display: none;
	}

	pre {
		tab-size: 4;
	}
}
</style>