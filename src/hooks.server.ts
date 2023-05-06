
import type { Handle } from '@sveltejs/kit';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import { detectLocale } from '$lib/i18n/i18n-util.js';
import { sequence } from '@sveltejs/kit/hooks';


const handleDetectLocale = (async ({ event, resolve }) => {
	// TODO: get lang from cookie / user setting
	const acceptLanguageHeaderDetector = initAcceptLanguageHeaderDetector(event.request);
	const locale = detectLocale(acceptLanguageHeaderDetector);
	event.locals.locale = locale;

	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
}) satisfies Handle;



import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { GOOGLe_ID, GOOGLE_SECRET } from "$env/static/private";


const handleAuth = SvelteKitAuth({
	//eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
  providers: [Google({ clientId: GOOGLe_ID, clientSecret: GOOGLE_SECRET })],
});

export const handle = sequence(handleDetectLocale, handleAuth);