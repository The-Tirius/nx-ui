/**
 * NoticeItem
 * @typedef {Object} NoticeItem
 * @property {string|number} [id] - Item id
 * @property {string} title
 * @property {string} message
 * @property {any} templateComponent
 * @property {string} templateProps
 */

import { defineStore } from 'pinia';

export const useUINoticeStore = defineStore('UINoticeStore', {
    state: () => {
        return {
			items: [],
		}
    },

	actions: {
		/**
		 * Add item
		 * @param {NoticeItem} v 
		 */
		add(v) {
			if (!v?.id) v.id = Math.random().toString(36).substr(2, 9);
			if (!v?.duration) v.duration = 10000;

			this.items.unshift(v);

			return v.id;
		},

		/**
		 * Remove item
		 * @param {string|number} id
		 */
		remove(id) {
			for (let i=0; i < this.items.length; i++) {
				if (this.items[i].id === id) {
					this.items.splice(i--, 1);
				}
			}
		},
	},
});