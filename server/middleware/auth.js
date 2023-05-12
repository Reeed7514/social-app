import UrlPattern from "url-pattern";
import { getUserById } from "../db/users";
import { decodeAccessToken } from "../utils/jwt";

export default defineEventHandler(async (event) => {
	const endpoints = [
		'/api/auth/user',
		'/api/user/tweets',
		'/api/tweets',
		// dynamic params
		'/api/tweets/:id'
	];

	const isHandledByThisMiddleware = endpoints.some(endpoint => {
		const pattern = new UrlPattern(endpoint);

		return pattern.match(event.node.req.url);
	})

	if (!isHandledByThisMiddleware) {
		return
	}


	// get access token from headers
	const token = event.node.req.headers['authorization']?.split(' ')[1];


	if (!token) {
		return sendError(event, createError({
			statusCode: 401,
			statusMessage: 'Unauthorized'
		}))
	}

	const decoded = decodeAccessToken(token);

	try {
		let user = await getUserById(decoded.userId);
		event.context.auth = { user };
	} catch (error) {
		return
	}
})