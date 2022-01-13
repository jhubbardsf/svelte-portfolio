import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { Handle, GetSession } from '@sveltejs/kit';
import { decodeToken } from '$lib/server/firebase';
import cookie from 'cookie';

const COOKIE_NAME = 'portfolio';

// export const getSession: GetSession = async (request: ServerRequest) => {
// 	console.log("In getSession");
// 	console.log("token: ", request.locals.token);

// 	let user;
// 	const token = request.locals.token;
// 	if (token) {
// 		console.log('decode token')
// 		user = decodeToken(token);
// 	}


// 	return { user: user }
// }

export async function getSession(request: ServerRequest) {
	console.log("In getSession");
	// const decodedToken: DecodedIdToken | null = request.locals.decodedToken;
	// console.log({ decodedToken });
	const cookies = cookie.parse(request.headers.cookie || '');
	const token = cookies[COOKIE_NAME];

	console.log("session before decodeToken");
	const decodedToken = await decodeToken(token);

	console.log("session after decodeToken");

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

	// endpoint call
	const response = await resolve(request);

	// after endpoint call
	const token = request.locals.token;
	if (token) {
		request.locals.decodedToken = await decodeToken(token);
	}

	const secure = process.env.NODE_ENV === 'production';
	// const secure = false;
	const maxAge = 7_200; // (3600 seconds / hour) * 2 hours
	const sameSite = 'Lax';
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
