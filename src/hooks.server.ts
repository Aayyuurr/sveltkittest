
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


//google auth

import { prisma } from '$lib/db.server';
import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { GOOGLe_ID, GOOGLE_SECRET } from "$env/static/private";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
const handleAuth = SvelteKitAuth({
	//eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	adapter: PrismaAdapter(prisma),
	//eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	providers: [Google({ clientId: GOOGLe_ID, clientSecret: GOOGLE_SECRET })],
});




//midelware for auth

import { redirect } from "@sveltejs/kit";

async function HandleProtection  ({ event, resolve }) {
	if (event.route.id?.includes('(protected)')) {
		const session = await event.locals.getSession();
		if (!session) {
		  throw redirect(303, "/");
		}
	  }
	
	  // If the request is still here, just proceed as normally
	  return resolve(event);
};




export const handle = sequence(handleDetectLocale, handleAuth, HandleProtection);