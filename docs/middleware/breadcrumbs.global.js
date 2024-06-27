export default defineNuxtRouteMiddleware((to) => {
	const nuxtApp = useNuxtApp();

	let currentPage = '';

	try {
		currentPage = to.name.split('___')[0];
	} catch (err) {
		console.log('breadcrumbs: unable to determine current page', to?.name, to);
		currentPage = 'index';
	}

	nuxtApp.$currentPage.value = currentPage;
	nuxtApp.$generateBreadcrumbs(to);
});
