import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import type { RequestEvent } from '@sveltejs/kit/types/hooks';
import { decodeToken } from '$lib/server/firebase';
import cookie from 'cookie';

const COOKIE_NAME = 'portfolio';

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession(event: RequestEvent) {
	console.log("In getSession");
	// Test vercel deploy
	let decodedToken;

	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	const token = cookies[COOKIE_NAME];

	decodedToken = await decodeToken(token);



	if (decodedToken) {
		const { uid, name, email } = decodedToken;
		return { user: { name, email, uid } };
	} else {
		return { user: null };
	}
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	console.log("In handle");

	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	// before endpoint call
	event.locals.token = cookies[COOKIE_NAME];


	// endpoint call
	const response: Response = await resolve(event);

	// after endpoint call
	const token = event.locals.token;

	const secure = process.env.NODE_ENV === 'production';
	const maxAge = 7_200; // (3600 seconds / hour) * 2 hours
	const sameSite = 'Strict';
	const setCookieValue = `${COOKIE_NAME}=${token || ''}; Max-Age=${maxAge}; Path=/; ${secure ? 'Secure;' : ''
		} HttpOnly; SameSite=${sameSite}`;

	response.headers.set('Set-Cookie', setCookieValue);

	return response;
};
