<template>
	<div>
		<ui-accordion 
			icon-light="/icons/question.svg" 
			icon-dark="/icons/question.svg" 
			:list="list" 
			:active="2"
		></ui-accordion>
	</div>
</template>

<script setup>
const list = [
	{
		"title": "Lorem ipsum...",
		"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo mauris quis nisl tristique, in varius lorem consequat."
	},
	{
		"title": "Dolor sit amet...",
		"text": "Dolor sit amet, consectetur adipiscing elit. Ut fermentum sapien et leo molestie, in commodo enim dictum."
	},
	{
		"title": "Consectetur adipiscing...",
		"text": "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
	},
	{
		"title": "Sed do eiusmod tempor...",
		"text": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
	},
	{
		"title": "Ut labore et dolore magna aliqua...",
		"text": "Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
	},
	{
		"title": "Ut enim ad minim veniam...",
		"text": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit."
	}
];
</script>