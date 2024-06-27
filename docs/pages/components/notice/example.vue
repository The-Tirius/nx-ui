<template>
	<div>
		<ui-button @click="showNotice">Show notice</ui-button>

		<ui-notice /> <!-- Wrapper for all the notices. Add this component (one) to page root -->
	</div>
</template>

<script setup>
const { $showNotice } = useNuxtApp();

const NoticeTemplate = markRaw(resolveComponent('notice-template-example'));

function showNotice() {
	$showNotice(8000, NoticeTemplate, {
		hello: 'Hello world!'
	});
}
</script>