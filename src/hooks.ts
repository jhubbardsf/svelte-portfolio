import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import type { RequestEvent } from '@sveltejs/kit/types/hooks';
import type { Handle, GetSession } from '@sveltejs/kit';
import { decodeToken } from '$lib/server/firebase';
import cookie from 'cookie';

const COOKIE_NAME = 'portfolio';

export async function getSession(event: RequestEvent) {
	console.log("In getSession");
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	const token = cookies[COOKIE_NAME];

	const decodedToken = await decodeToken(token);

	if (decodedToken) {
		const { uid, name, email } = decodedToken;
		return { user: { name, email, uid } };
	} else {
		return { user: null };
	}
}

export const handle: Handle = async ({ request, resolve }) => {
	console.log("In handle");
	const cookies = cookie.parse(request.headers.cookie || '');

	// before endpoint call
	request.locals.token = cookies[COOKIE_NAME];

	// endpoint call
	const response = await resolve(request);

	// after endpoint call
	const token = request.locals.token;

	const secure = process.env.NODE_ENV === 'production';
	const maxAge = 7_200; // (3600 seconds / hour) * 2 hours
	const sameSite = 'Strict';
	const setCookieValue = `${COOKIE_NAME}=${token || ''}; Max-Age=${maxAge}; Path=/; ${secure ? 'Secure;' : ''
		} HttpOnly; SameSite=${sameSite}`;

	return {
		...response,
		headers: {
			...response.headers,
			'Set-Cookie': setCookieValue
		}
	}
};
