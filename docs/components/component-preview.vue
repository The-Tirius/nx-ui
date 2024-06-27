<template>
	<section class="component-preview">
		<div class="component-preview--title">{{ title }}</div>
		<div v-if="hasSlot('description')" class="description g-typography tag-theme-auto">
			<slot name="description"></slot>
		</div>
		<div v-if="hasSlot('control')" class="component-preview--control">
			<slot name="control"></slot>
		</div>
		<div class="component-preview--component">
			<slot></slot>
		</div>
		<div v-if="example" class="component-preview--example">
			<pre>{{ example }}</pre>
			<!-- <Shiki :code="example" theme-light="github-light" theme-dark="github-dark" />	 -->
		</div>
	</section>
</template>

<script setup>
// Data
	const props = defineProps({
		title: {
			type: String,
		},
		example: {
			type: String,
		},
	});

	const slots = useSlots();

// Methods
	const hasSlot = (name) => {
		return !!slots[name];
	}

// Hooks

</script>

<style lang="less">
.component-preview {
	padding: var(--space-default);
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius);

	.component-preview--title {
		font-weight: bold;
		font-size: var(--text-medium);
		color: var(--color-header-text);
	}

	.component-preview--control {
		display: grid;
		grid-template-columns: 1fr 1fr; // base columns and their sizes
  		grid-auto-flow: column; // tells to add new children as new columns
 		grid-auto-columns: 1fr; // tells the size of the dynamic columns
		gap: var(--space-mini);

		margin-top: var(--space-default);
	}

	.component-preview--example {
		overflow: hidden;
		margin-top: var(--space-default);
		padding: var(--space-default);
		border-top: 1px solid var(--color-border);
		border-radius: var(--border-radius);
		color: @theme-dark-color-text;
		background: #24292e; // code highlight theme background

		pre {
			overflow: auto;
		}
	}

	.component-preview--component {
		margin-top: var(--space-default);
		padding-top: var(--space-default);
		border-top: 1px solid var(--color-border);
	}
}
</style>