import type { RequestEvent } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ params, request, locals }) {
    console.log("login.js");
    let body = await request.json();

    const token: string = body.token || '';
    locals.token = token;

    return {
        status: 200
    }
}