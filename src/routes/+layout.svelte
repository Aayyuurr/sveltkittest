<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { setLocale } from '$lib/i18n/i18n-svelte.js';

	export let data;
	setLocale(data.locale);
</script>
<h2>layout1</h2>
<slot />
