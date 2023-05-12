import { getUserByUsername } from "~/server/db/users";
import { generateTokens, sendRefreshToken } from '../../utils/jwt';
import bcrypt from 'bcrypt';
import { userTransformer } from "~/server/transformers/user";
import { createRefreshToken } from "~/server/db/refreshTokens";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const { username, password } = body;

	if (!username || !password) {
		return sendError(event, createError({
			statusCode: 400,
			statusMessage: 'Invalid params'
		}))
	}

	// is the user registered?
	// dont forget await
	const user = await getUserByUsername(username);

	if (!user) {
		return sendError(event, createError({
			statusCode: 400,
			statusMessage: 'username or password is invalid'
		}))
	}

	const passwordMatch = await bcrypt.compare(password, user.password);

	if (!passwordMatch) {
		return sendError(event, createError({
			statusCode: 400,
			statusMessage: 'username or password is invalid'
		}))
	}

	const { accessToken, refreshToken } = generateTokens(user);
	
	// save it to db
	await createRefreshToken({
		token: refreshToken,
		userId: user.id
	})

	// add http only cookie
	sendRefreshToken(event, refreshToken);

	return {
		access_token: accessToken,
		user: userTransformer(user)
	}
})