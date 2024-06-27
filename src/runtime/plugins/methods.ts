import { defineNuxtPlugin } from '#app';
import { useUINoticeStore } from '../components/notice/store';

export default defineNuxtPlugin(function (nuxt) {
	const noticeStore = useUINoticeStore();

    return {
        provide: {
            showNotice(duration: 8000, templateComponent: any, templateProps: {}) {
				const id = noticeStore.add({
					duration, 
					templateComponent,
					templateProps
				});

				return id;
			},
            hideNotice(id) {
				noticeStore.remove(id);
			}
        },
    };
});
