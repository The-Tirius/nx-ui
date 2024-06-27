<template>
	<div class="component-ui component-ui-impulse-indicator">
		<transition-group name="impulse" tag="span">
			<span 
				v-for="item in impulseArray" 
				:key="item.id" 
				class="impulse"
				:style="{top: item.top, left: item.left, background: item.background}"
			></span>
		</transition-group>
	</div>
</template>

<script>
export default {
	name: 'impulse-indicator',
	
	// Data
	props: {
		impulse: {
			type: [Object, Boolean],
			default: false
		}
	},
	data() {
		return {
			impulseArray: []
		};
	},
	watch: {
		impulse(options) {
			if (options) {
				this.$emit('update:impulse', false);
				this.addImpulse(options);
			}
		}
	},
	
	// Methods
	methods: {
		addImpulse(options) {
			let id = Math.random().toString(36).substr(2, 9);

			options = Object.assign({
				background: '#000'
			}, options);

			options.id = id;

			if ('event' in options) {
				let target = ('target' in options) ? options.target : event.target;

				let rect = target.getBoundingClientRect();

				options.left = options.event.clientX - rect.left;
				options.top = options.event.clientY - rect.top;
			}

			const sLeft = options.left.toString();
			const sTop = options.top.toString();

			if (sLeft.indexOf('px') == -1 && sLeft.indexOf('%') == -1) {
				options.left = options.left + 'px';
			}

			if (sTop.indexOf('px') == -1 && sTop.indexOf('%') == -1) {
				options.top = options.top + 'px';
			}

			this.impulseArray.push(options);

			setTimeout(() => {
				for (let i=0, item; i < this.impulseArray.length; i++) {
					item = this.impulseArray[i];

					if (item.id === id) this.impulseArray.splice(i--, 1);
				}
			}, 2000);
		}
	},
	
	// Hooks
	mounted() {
		
	},
}
</script>

<style lang="less">
.component-ui-impulse-indicator {
	@keyframes impulse {
		0% {
			opacity: 0;
			transform: translate3d(-50%, -50%, 0) scale(0.01);
		}
		10% {
			opacity: 0.06;
		}
		30% {
			opacity: 0.12;
		}
		90% {
			opacity: 0.05;
			transform: translate3d(-50%, -50%, 0) scale(1);
		}
		100% {
			opacity: 0;
		}
	}

	overflow: hidden;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	pointer-events: none;

	.impulse {
		transform-origin: 50% 50%;
		transform: translate3d(-50%, -50%, 0);
		opacity: 1;

		position: absolute;
		top: 50%;
		left: 50%;

		padding-bottom: 200%;
		width: 200%;

		border-radius: 50%;
		background: #000811;

		pointer-events: none;

		animation: 0.8s ease-in-out 1 both impulse;
	}
}
</style>