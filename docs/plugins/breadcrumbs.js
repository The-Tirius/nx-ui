import { ref } from 'vue';

export default defineNuxtPlugin((NuxtApp) => {
	const locales = NuxtApp.$i18n.locales.value.map((v) => v.code);

	const breadcrumbs = ref([]);
	const breadcrumbsTitle = ref('');
	const currentPage = ref('index');

	function generateBreadcrumbs(route) {
		const routeAr = route.path !== '/' ? route.path.split('/') : [''];
		const routeArFull = route.fullPath.split('/');

		// Empty array (reactivity issue)
		breadcrumbs.value.splice(0, breadcrumbs.value.length);

		// Generate breadcrumbs
		for (let i=0, url='', text; i < routeAr.length; i++) {
			// Replace '' with 'index'
			if (routeAr[i] === '') {
				text = 'index';
			// Skip language code
			} else if (locales.includes(routeAr[i])) {
				continue;
			} else {
				text = routeAr[i];
			}

			url += routeArFull[i] + ((!routeArFull[i].includes('?') || !routeArFull[i].includes('#')) ? '/' : '');

			breadcrumbs.value.push({
				url: url,
				text: 'breadcrumbs.' + text,
				last: i === routeAr.length - 1
			});
		}

		breadcrumbsTitle.value = breadcrumbs.value.length ? breadcrumbs.value[breadcrumbs.value.length-1].text : '';
	}

	function setBreadcrumbs(v) {
		breadcrumbs.value = v;
	}
	
	function addBreadcrumb(text, url, bcTitle = '', replaceLastElement = true) {
		const v = breadcrumbs.value;

		//if (!url) url = context.getRouteBaseName() +'?'+ new URLSearchParams(context.query).toString();
		if (!url) url = NuxtApp.$router.currentRoute.value.fullPath;
		if (replaceLastElement) v.pop();

		for (let i=0; i < v.length; i++) {
			v[i].last = false;
		}
		
		v.push({
			text,
			url,
			last: true
		});

		breadcrumbsTitle.value = bcTitle ? bcTitle : text;
	}

    return {
        provide: {
			breadcrumbs: breadcrumbs,
			breadcrumbsTitle: breadcrumbsTitle,
            generateBreadcrumbs,
			setBreadcrumbs,
			addBreadcrumb,
			currentPage,
        },
    };
});
