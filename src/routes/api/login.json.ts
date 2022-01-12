export function post(request) {
    console.log("login.js");
    console.log({ request });

    const token: string = request.body?.token || '';
    request.locals.token = token;

    return {
        status: 200
    }
}