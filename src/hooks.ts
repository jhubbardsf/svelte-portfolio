import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { Handle, GetSession } from '@sveltejs/kit';
import { decodeToken } from '$lib/server/firebase';
import cookie from 'cookie';

const COOKIE_NAME = 'portfolio';

export async function getSession(request: ServerRequest) {
	console.log("In getSession");
	console.log("request.locasls", request.locals);
	const decodedToken: DecodedIdToken | null = request.locals.decodedToken;

	// const cookies = cookie.parse(request.headers.cookie || '');
	// const token = cookies[COOKIE_NAME];

	// console.log("session before decodeToken");
	// const decodedToken = await decodeToken(token);

	console.log("session after decodeToken");
	console.log({ decodedToken })

	if (decodedToken) {
		const { uid, name, email } = decodedToken;
		return { user: { name, email, uid } };
	} else {
		return { user: null };
	}
}

export const handle: Handle = async ({ request, resolve }) => {
	console.log("In handle");
	console.log("Handle request: ", request);
	const cookies = cookie.parse(request.headers.cookie || '');

	// before endpoint call
	request.locals.token = cookies[COOKIE_NAME];
	console.log("request.locals.token", request.locals.token);
	// request.locals.decodedToken = await decodeToken(request.locals.toke);
	const token = request.locals.token;
	if (token) {
		request.locals.decodedToken = await decodeToken(token);
	}
	// endpoint call
	const response = await resolve(request);

	// after endpoint call


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
