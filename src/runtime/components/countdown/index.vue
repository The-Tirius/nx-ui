<template>
	<span class="component-ui-countdown">
		{{ time }}
	</span>
</template>

<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue';
import Countdown from '../helpers/Countdown';
import comProps from '#build/ui.countdown.mjs';

// Data
	//const { t } = useI18n();
	const props = defineProps({
		ms: {
			type: Number,
			default: comProps.ms,
			//default: 0
		},
		h: {
			default: comProps.h,
		},
		m: {
			default: comProps.m,
		},
		s: {
			default: comProps.s,
		},
	});

	const initialized = ref(false);
	
	const time = ref(0);
	let countdown = null;

	watchEffect(() => {
		if (!initialized.value) return;
		if (countdown) countdown.destroy();

		countdown = new Countdown( props.ms / 1000 );
		countdown.onTick = onTick;
		countdown.onFinish = onFinish;
		countdown.start();
	});

// Methods
	function onTick(e) {
		const h = parseInt(e.h) ? `${e.h}${props.h} ` : '';
		
		time.value = `${h}${e.m}${props.m} ${e.s}${props.s}`;
	}

	function onFinish() {
		time.value = '00:00:00';
	}

// Hooks
	onMounted(() => {
		initialized.value = true;
	});
	onBeforeUnmount(() => {
		if (countdown) countdown.destroy();
	});
</script>