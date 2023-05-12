import jwt from 'jsonwebtoken';


const generateAccessToken = (user) => {
	const config = useRuntimeConfig();
	const accessToken = jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
		expiresIn: '60m'
	})
	return accessToken;
}

const generateRefreshToken = (user) => {
	const config = useRuntimeConfig();
	const refreshToken = jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
		expiresIn: '4h'
	});
	return refreshToken;
}

export const decodeRefreshToken = (refreshToken) => {
	try {
		const config = useRuntimeConfig();

		const token = jwt.verify(refreshToken, config.jwtRefreshSecret);

		return token;
	} catch (error) {
		console.log(error);
	}
}

export const decodeAccessToken = (accessToken) => {
	try {
		const config = useRuntimeConfig();

		const token = jwt.verify(accessToken, config.jwtAccessSecret);

		return token;
	} catch (error) {
		console.log(error);
	}
}

export const generateTokens = (user) => {
	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user);

	return {
		accessToken,
		refreshToken
	}
}

export const sendRefreshToken = (event, refreshToken) => {
	setCookie(event, 'refresh_token', refreshToken, {
		httpOnly: true,
		sameSite: true
	});
}