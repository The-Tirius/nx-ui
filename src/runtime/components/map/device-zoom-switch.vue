<template>
	<section 
		class="component-ui-map-device-zoom-switch" 
		@click="handleClick"
		:class="{'tag-enable': deviceZoom}"
		ref="refRoot"
	>
		<ui-impulse-indicator :impulse="impulse" />
		<i class="icon-state"></i>
		<slot />
	</section>
</template>

<script setup>
import { storeToRefs } from 'pinia';

// Data
const props = defineProps(['store']);
const { deviceZoom } = storeToRefs(props.store);
const refRoot = ref(false);
const impulse = ref(false);

// Methods
function handleClick(e) {
	// if (props.store.deviceZoom) {
	// 	setTimeout(() => {
	// 		props.store.setDeviceZoom();
	// 	}, 1000);
	// } else {
	// 	props.store.setDeviceZoom();
	// }

	props.store.setDeviceZoom();

	const rect = refRoot.value.getBoundingClientRect();

	impulse.value = {
		left	: e.clientX - rect.left,
		top		: e.clientY - rect.top,
		width	: refRoot.value.offsetWidth,
		height	: refRoot.value.offsetHeight
	};
}

</script>

<style lang="less">
@com-size: var(--ui-input-height-default);
@com-border-radius-default: var(--ui-border-radius-default);
@com-ani-time: var(--ui-ani-time);
@com-ani-ease: var(--ui-ani-ease);

// Colors
@com-color-surface: var(--ui-color-surface);

// Box shadow
@com-bs-1: var(--ui-bs-1);

.component-ui-map-device-zoom-switch {
	width: @com-size;
	height: @com-size;
	line-height: @com-size;
	text-align: center;

	background: @com-color-surface;
	box-shadow: @com-bs-1;
	border-radius: @com-border-radius-default;
	cursor: pointer;

	&:before,
	&:after {
		content: '';

		position: absolute;
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;
	}

	// Mouse
	&:before {
		transition: opacity @com-ani-time @com-ani-ease;
		opacity: 0.6;

		transform: translate3d(-50%, -50%, 0);
		top: 50%;
		left: 50%;

		width: 30px;
		height: 30px;
		background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODQgNTEyIj48cGF0aCBkPSJNMjI0IDBoLTY0QzcxLjYyIDAgMCA3MS42MyAwIDE2MHYxOTJjMCA4OC4zOCA3MS42MyAxNjAgMTYwIDE2MGg2NGM4OC4zOCAwIDE2MC03MS42MyAxNjAtMTYwVjE2MEMzODQgNzEuNjIgMzEyLjQgMCAyMjQgMFptMTI4IDM1MmMtLjEyNSA3MC42My01Ny4zOCAxMjcuOS0xMjggMTI4aC02NGMtNzAuNjMtLjEyNS0xMjcuOS01Ny4zOC0xMjgtMTI4VjE2MGMuMTI1LTcwLjYzIDU3LjM4LTEyNy45IDEyOC0xMjhoNjRjNzAuNjMuMTI1IDEyNy45IDU3LjM4IDEyOCAxMjh6Ii8+PHBhdGggZD0ibTE5Mi43NzggOTIuNDM4LTU5LjYyNyA1OS4wOTdoMTE5Ljc3MnptLTYxLjcwMSAxMTIuNjE5IDYyLjczOCA2MS44ODQgNTkuMTA4LTYwLjc3eiIvPjwvc3ZnPg==");
	}

	.icon-state {
		transform: translateY(-50%);

		position: absolute;
		left: 2px;
		top: 50%;

		width: 16px;
		height: 16px;

		&:before,
		&:after {
			content: '';

			transition: opacity 0.5s @com-ani-ease;
			position: absolute;
			inset: 0;

			background-color: @com-color-surface;
			background-position: center;
			background-repeat: no-repeat;
			background-size: 10px;
			border-radius: 50%;
		}

		// Disabled
		&:before {
			background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48cGF0aCBmaWxsPSIjZjAwIiBkPSJNODAgMTkyVjE0NEM4MCA2NC40NyAxNDQuNSAwIDIyNCAwQzMwMy41IDAgMzY4IDY0LjQ3IDM2OCAxNDRWMTkySDM4NEM0MTkuMyAxOTIgNDQ4IDIyMC43IDQ0OCAyNTZWNDQ4QzQ0OCA0ODMuMyA0MTkuMyA1MTIgMzg0IDUxMkg2NEMyOC42NSA1MTIgMCA0ODMuMyAwIDQ0OFYyNTZDMCAyMjAuNyAyOC42NSAxOTIgNjQgMTkySDgwek0xNDQgMTkySDMwNFYxNDRDMzA0IDk5LjgyIDI2OC4yIDY0IDIyNCA2NEMxNzkuOCA2NCAxNDQgOTkuODIgMTQ0IDE0NFYxOTJ6Ii8+PC9zdmc+");
		}

		// Enabled
		&:after {
			opacity: 0;
			background-size: 15px;
  			background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MjAgNTIwIj48cGF0aCBmaWxsPSIjMTRhMjQxIiBkPSJNMTgwLjU1NSA0NjguOTY5YTEwIDEwIDAgMCAxLTguNjI0LTQuOTM4QzEzNC41NTIgNDAwLjM1IDM0Ljk0NyAyNjQuODIgMzMuOTQ1IDI2My40NThhMTAgMTAgMCAwIDEgMS4wMjYtMTMuMDM5bDMwLjYxOC0zMC4yNTVhMTAgMTAgMCAwIDEgMTIuNzU0LTEuMDg2bDEwMC4xMjcgNjkuOTE2YzY2LjU2OC04NS41MTYgMTI4LjQzLTE0NC41MzMgMTY5LjA5LTE3OS4zMDcgNDUuNTc1LTM4Ljk4MyA3NC41NTEtNTYuNSA3NS43NjItNTcuMjNhMTAgMTAgMCAwIDEgNS4xNDYtMS40MjZINDc4YTEwIDEwIDAgMCAxIDYuNjUxIDE3LjQ2OWMtNzMuNDMxIDY1LjQtMTQ5Ljc3NSAxNjkuMzEzLTIwMC44ODggMjQ0Ljk2Ni01NS41NjMgODIuMjM0LTk0LjEzNSAxNDkuNzc5LTk0LjUxOCAxNTAuNDUyYTEwIDEwIDAgMCAxLTguNjI0IDUuMDV6Ij48L3BhdGg+PC9zdmc+");
		}
	}

	&.tag-enable {
		&:after {
			opacity: 0;
		}

		.icon-state {
			&:before {
				opacity: 0;
			}
			&:after {
				opacity: 1;
			}
		}
	}

	&:hover {
		&:before {
			opacity: 1;
		}
	}
}


.tag-mobile .component-ui-map-device-zoom-switch {
	&:before {
 		 background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIuMjUgNTEyLjI1Ij48cGF0aCBkPSJNMTk4LjUxNCAzMjYuMzJjNS4wODMtNC4xMTIgMTAuOTE3LTYuNzU1IDE3LjExNy03Ljc5LTkuMzItMTUuODE5LTUuODIyLTM2LjUxNSA5LjA5LTQ4LjMzNiA0Ljk4MS00LjAzMiAxMC44OTYtNi41NzIgMTcuMDk3LTcuNjA3LTkuMzItMTUuODItNS44MjItMzYuNTE1IDkuMDktNDguMzM3IDQuOTctMy45NCAxMC43MDItNi41MDIgMTYuNzIyLTcuNTU3bC0zMC4zOTctMzguMzQ0Yy0xMi43ODYtMTYuMTI4LTEwLjA3NC0zOS41ODcgNi4xNTYtNTIuNDU0IDE2LjEyOS0xMi43ODYgMzkuNTg4LTEwLjA3NCA1Mi4zNzQgNi4wNTVsMTE2Ljc1MiAxNDcuMzggMjEuMzI2LTc2Ljg2OWM1LjQ1LTIwLjgzOCAyNS42NjctMzQuNzE4IDQ3LjEyNi0zMi4yMzcgMTYuMDAzIDEuODUgMjcuNTgzIDE2LjQ1NyAyNS43MzMgMzIuNDZsLTIxLjE1MSAxODIuOTQ1Yy0zLjMgMjguNTUtMTcuNDg1IDU0LTQwLjAwNCA3MS44NTNsLTMzLjk5MyAyNy4wM2MtMjIuNDE4IDE3Ljc3Mi01MC41MjQgMjUuNzYzLTc4Ljk4NSAyMi40NzItMjYuNTUtMy4wNy01MC45NjUtMTUuODQyLTY4LjUzNC0zNi4wMjZsLTcxLjY3NS04Mi4xODRjLTEyLjc4Ni0xNi4xMy0xMC4wNzQtMzkuNTg4IDYuMTU2LTUyLjQ1NXptOC44NCAzOS45MDUgNzEuNDM0IDgxLjg4YzE0LjQgMTYuNSAzNC4yOTggMjYuOTEgNTYuMDMgMjkuNDIxIDIzLjI3NyAyLjY5MiA0Ni4yNDItMy44NjcgNjQuNjAyLTE4LjQyM2wzMy45OTMtMjcuMDNjMTguMzYtMTQuNTU1IDI5Ljk4Ny0zNS40MTYgMzIuNjg3LTU4Ljc4NWwyMS4xNDEtMTgyLjg1NGMuNjItNS4zNjQtMy4yNC0xMC4yMzMtOC42MDQtMTAuODUzLTExLjgyLTEuMzY3LTIyLjkzMyA2LjI4Ni0yNi4wMjcgMTcuOTA3bC0yNi41MjQgOTUuNTI1Yy0uOTY2IDMuNTc0LTMuODUgNi4xOS03LjQ0MSA2Ljk3Mi0zLjU5Mi43ODMtNy4yOTUtLjY2LTkuNjM4LTMuNTFMMjgwLjI2NCAxMzQuMDcyYy02LjExMi03LjcwOC0xNy4yOTUtOS4wMDItMjUuMTA3LTIuODEtNy43MSA2LjExMi05LjAwMiAxNy4yOTYtMi44OSAyNS4wMDVsODUuOTg0IDEwOC4yNTZjMy4zODMgNC4yMjEgMi42NyAxMC4zOTItMS41ODggMTMuNzMtNC4yMjEgMy4zODItMTAuMzkgMi42NjktMTMuNzMtMS41ODdsLTM1LjA2LTQ0LjIyN2MtNS44Ny03LjQwNS0xNy40MDgtOC44My0yNS4xMDctMi44MS03LjcwOCA2LjExLTkuMDAyIDE3LjI5NS0yLjg5IDI1LjAwNGwzMC43MjkgMzguNjU5IDQuMzQyIDUuNDc4YzMuMzgyIDQuMjIxIDIuNjY5IDEwLjM5MS0xLjU4NyAxMy43My00LjIyMiAzLjM4Mi0xMC4zOTIgMi42NjgtMTMuNzMtMS41ODhsLTQuMzQyLTUuNDc4LTEzLjUxLTE3LjA0MmMtNS44Ny03LjQwNS0xNy40MDgtOC44My0yNS4xMDctMi44MS03LjcwOCA2LjExMi05LjAwMiAxNy4yOTYtMi44OSAyNS4wMDVsMTMuNiAxNy4wNTMgNC4yNjIgNS4zNzYuMDgxLjEwMWMzLjM4MiA0LjIyMiAyLjY2OSAxMC4zOTItMS41ODggMTMuNzMtNC4yMiAzLjM4Mi0xMC4zOTEgMi42NjktMTMuNzMtMS41ODdsLS43MjMtLjkxNGMtNS45NjEtNy40MTUtMTcuNDA5LTguODMtMjUuMTA3LTIuODEtNy43MSA2LjExMi05LjAwMiAxNy4yOTUtMy4yMjIgMjQuNjl6TTMzNi43NDMgNzguMjU4Yy41ODUtNS4yNjIgNS40NTktOC44NiAxMC41NDEtOC4zNjNsMTMyLjc4IDE1LjY4LTE4LjY2OC0zMC42Yy0yLjcwNi00LjUyNC0xLjMyMy0xMC4zMjYgMy4yLTEzLjAzMiA0LjQzNi0yLjcwNSAxMC4zMjUtMS4zMjMgMTMuMDMgMy4xMTJsMjguODYgNDcuMjc0Yy44MTIgMS4yNDIgMS4xOCAyLjY2NSAxLjM2NyA0LjA4OS4wOTcuOTguMDE0IDEuODcxLS4xNTcgMi43NjQtLjA4Ny4yNjctLjA4Ni41MzQtLjE3My43MTQgMCAuMDg5LS4wODguMTc4LS4wODguMTc4LS4wODguMTc4LS4wODcuMzU3LS4xNzMuNTM2IDAgLjA4OS0uMDg5LjE3OS0uMDg4LjI2OGwtLjI2NC41MzdjLjAwMS4wODktLjA4Ny4xNzgtLjA4Ni4yNjhsLS4yNjQuNTM2YzAgLjA5LS4wODkuMDktLjA4OC4xNzgtLjA4Ny4xOC0uMjY0LjM2LS40NDEuNTM5bC0uMDg5LjA5Yy0uMTc3LjI2OC0uNDQyLjUzNy0uNzA3LjgwN2wtMzcuNzYgMzguMzIzYy0xLjg1OCAxLjg4NC00LjI1NyAyLjc5My02Ljc1MSAyLjgxLTIuNDk1LjAyLTQuOTA3LS44NTQtNi43OTItMi43MTEtMy43Ny0zLjY3Ni0zLjgxNC05LjcyMi0uMDk5LTEzLjQ1M2wyNC4xNDItMjQuNDEyLTEzMi44NjgtMTUuNTkxYy01LjE3Mi0uNTg2LTguOTQ5LTUuMzY5LTguMzY0LTEwLjU0ek0xMjQuNDE4IDU1LjgwMmE3LjQ4IDcuNDggMCAwIDEgLjYwOC0yLjMyMmwtLjAwMi0uMDg4Yy4wODgtLjE3OC4xNzUtLjQ0Ny4yNjMtLjYyNS4wODgtLjA5LjA4Ny0uMTc5LjE3Ny0uMjY5LjA4Ni0uMTc4LjE3NS0uMjY5LjI2Mi0uNDQ4LjI2NC0uNTM2LjYxNy0uOTg0Ljk3LTEuNDMzbC4wODgtLjA5Yy4wODktLjE3OC4yNjYtLjI2OS4zNTQtLjQ0N0wxNjQuOSAxMS43NTdjMy42NzYtMy43NyA5LjcyMi0zLjgxNSAxMy40NTQtLjEgMy43NyAzLjY3NyAzLjgxNCA5LjcyMy4wOTggMTMuNDU0bC0yMy45NjUgMjQuMzIyIDE0Mi4yMjQgMTUuN2M1LjIwNi41NTggOC45NiA1LjI1IDguMzY0IDEwLjQ1MS0uNSA0LjgxNS00LjU3MiA4LjQxLTkuMzgzIDguNDQ0LS4zNTcuMDAzLS44MDIuMDA2LTEuMTYtLjA4bC0xNDIuNC0xNS43IDE4Ljc1OSAzMC43NzljMi43MDYgNC41MjQgMS4zMjMgMTAuMzI1LTMuMjAxIDEzLjAzMmE5LjY1NiA5LjY1NiAwIDAgMS00Ljg5IDEuMzcyYy0zLjIwOC4wMjMtNi4zMzgtMS41NTctOC4xNDItNC41NzNsLTI4LjU5LTQ2LjgzMmMtMS4yNTgtMS41OTQtMS44OTgtMy44MTgtMS42NDktNi4yMjR6Ii8+PC9zdmc+");
	}
}
</style>