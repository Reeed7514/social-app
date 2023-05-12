import { decodeRefreshToken } from "~/server/utils/jwt";
import { findRefreshTokenByToken } from "~/server/db/refreshTokens";
import { getUserById } from "~/server/db/users";

export default defineEventHandler(async (event) => {
	// get token from cookie
	let refreshToken = getCookie(event, 'refresh_token');

	if (!refreshToken) {
		return sendError(event, createError({
			statusCode: 401,
			statusMessage: 'refresh token is invalid'
		}))
	}

	// find refresh token from db
	const rToken = await findRefreshTokenByToken(refreshToken);

	if (!rToken) {
		return sendError(event, createError({
			statusCode: 401,
			statusMessage: 'refresh token is invalid'
		}))
	}

	// decode the token to get use information
	const token = decodeRefreshToken(rToken.token);

	if (!token) return { expired: true };

	try {

		const user = await getUserById(token.userId);
		// we only need access token
		const { accessToken } = generateTokens(user);
		// return the refreshed token
		return { access_token: accessToken, expired: false };

	} catch (error) {
		return sendError(event, createError({
			statusCode: 500,
			statusMessage: 'Something went wrong'
		}))
	}
})