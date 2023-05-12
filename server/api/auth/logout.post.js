import { removeRefreshToken } from "~/server/db/refreshTokens"


export default defineEventHandler(async (event) => {

	
	// remove refresh token from db
	try {
		let refreshToken = getCookie(event, 'refresh_token')

		await removeRefreshToken(refreshToken)
	} catch (error) {
		// return sendError(event, createError({
		// 	statusCode: 500,
		// 	statusMessage: 'Something went wrong'
		// }))
	}

	// clear refresh token on client side
	sendRefreshToken(event, null)

	return {
		message: 'Done'
	}
})