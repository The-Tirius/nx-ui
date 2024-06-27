<template>
	<section class="component-ui component-ui-grid" :class="getClasses" :style="getStyle">
		<slot></slot>
	</section>
</template>

<script>
export default {
	// Data
	props: {
		textAlign: {
			type: String,
			default: 'left'
		},
		gap: {
			type: [String, Object],
			default: 'var(--ui-space-default)'
		},
		gridTemplateColumns: {
			type: [String, Object],
			default: ''
		},
		gapTop: {
			type: [Boolean, String],
			default: false
		},
		gapBottom: {
			type: [Boolean, String],
			default: false
		},
	},
	data: function () {
		return {
			timeout: null,
			windowWidth: 999999
		};
	},
	computed: {
		getClasses() {
			let r = [
				'tag-text-' + this.textAlign
			];

			return r;
		},
		getStyle() {
			let r = {};
			let padding = this.computedGap.split(' ');
			let paddingTop = padding[0];
			let paddingBottom = padding[0];

			r['grid-gap'] = this.computedGap;

			if (this.computedGridTemplateColumns) {
				r['grid-template-columns'] = this.computedGridTemplateColumns;
			}

			if (this.gapTop === true)
				r['padding-top'] = paddingTop;

			if (this.gapBottom === true)
				r['padding-bottom'] = paddingBottom;

			return r;
		},
		computedItemMaxWidth() {
			return parseInt(this.itemMaxWidth);
		},
		computedGridTemplateColumns() {
			if (typeof this.gridTemplateColumns == 'object') {
				let result = 'default';
				let ar = [];

				for (let key in this.gridTemplateColumns) {
					if (key !== 'default') {
						ar.push(key >> 0);
					}
				}

				if (ar.length) {
					ar = ar.sort((a, b) => a - b);

					for (let i = 0; i < ar.length; i++) {
						if (this.windowWidth < ar[i]) {
							result = ar[i] + '';
							break;
						}
					}
				}

				return this.gridTemplateColumns[result];
			}

			return this.gridTemplateColumns;
		},
		computedGap() {
			if (typeof this.gap == 'object') {
				let result = 'default';
				let ar = [];

				for (let key in this.gap) {
					if (key !== 'default') {
						ar.push(key >> 0);
					}
				}

				if (ar.length) {
					ar = ar.sort((a, b) => a - b);

					for (let i = 0; i < ar.length; i++) {
						if (this.windowWidth < ar[i]) {
							result = ar[i] + '';
							break;
						}
					}
				}

				return this.gap[result];
			}

			return this.gap;
		},
	},

	// Methods
	methods: {
		handleResize() {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(this.onResize.bind(this), 250);
		},
		onResize() {
			this.windowWidth = window.innerWidth;
		},
	},

	// Hooks
	mounted() {
		this.$nextTick(() => {
			this.handleResize();

			window.addEventListener('resize', this.handleResize);
			window.addEventListener('orientationchange', this.handleResize);
		});
	},

	beforeDestroy() {
		window.removeEventListener('resize', this.handleResize);
		window.removeEventListener('orientationchange', this.handleResize);
	},
}
</script>

<style lang="less">
.component-ui-grid {
	display: grid;

	&.tag-text-center {
		text-align: center;
	}

	&.tag-text-left {
		text-align: left;
	}

	&.tag-text-right {
		text-align: right;
	}
}
</style>