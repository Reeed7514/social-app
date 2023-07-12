export default () => {
	const useAuthToken = () => useState('auth_token');
	const useAuthUser = () => useState('auth_user');
	const useAuthLoading = () => useState('auth_loading', () => true);

	const setToken = (token) => {
		const authToken = useAuthToken();
		authToken.value = token;
	}

	const setUser = (user) => {
		const authUser = useAuthUser();
		authUser.value = user;
	}

	const getUser = () => {
		return new Promise(async (resolve, reject) => {
			try {
				// you cant do useFetch here
				const data = await useFetchApi('/api/auth/user');

				// console.log('got user', data)

				setUser(data.user);

				resolve(true);
			} catch (error) {
				reject(error);
			}
		})
	}

	const setIsAuthLoading = (isLoading) => {
		const authLoading = useAuthLoading();
		authLoading.value = isLoading;
	}

	const login = ({ username, password }) => {
		return new Promise(async (resolve, reject) => {
			try {
				// you cant do useFetch here
				const data = await $fetch('/api/auth/login', {
					method: 'POST',
					body: {
						username,
						password
					}
				})

				// console.log('data', data)

				setToken(data.access_token);
				setUser(data.user);

				resolve(true);
			} catch (error) {
				reject(error);
			}
		})
	}


	const register = ({ username, email, password, repeatPassword, name, profileImage }) => {

		return new Promise(async (resolve, reject) => {
			try {
				const form = new FormData();

				form.append('username', username);
				form.append('name', name);
				form.append('email', email);
				form.append('password', password);
				form.append('repeatPassword', repeatPassword);
				form.append('profileImage', profileImage);

				await $fetch('/api/auth/register', {
					method: 'POST',
					body: form
				})

				resolve(true)
			} catch (error) {
				reject(error)
			}
		})
	}


	const refreshToken = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const { access_token, expired } = await $fetch('/api/auth/refresh');

				if (expired) reject('refresh token expired');

				// console.log('refreshed token', access_token)

				setToken(access_token);
				resolve(true);
			} catch (error) {
				reject(error);
			}
		})
	}

	const reRefreshAccessToken = () => {
		const authToken = useAuthToken();

		if (!authToken.value) {
			return
		}

		const expirationTime = 3600000;

		setTimeout(async () => {
			await refreshToken();
			// refresh the access token and set the timer again
			reRefreshAccessToken();
		}, expirationTime);

	}

	// called whenever we refresh the page
	const initAuth = () => {
		return new Promise(async (resolve, reject) => {
			setIsAuthLoading(true);
			try {
				await refreshToken();

				await getUser();
				resolve(true);

				reRefreshAccessToken();
			} catch (error) {
				reject(error);
			} finally {
				setIsAuthLoading(false);
			}
		})
	}

	const logout = () => {
		return new Promise(async (resolve, reject) => {
			try {
				await $fetch('/api/auth/logout', {
					method: 'POST'
				})

				setUser(null)
				setToken(null)

				resolve(true)
			} catch (error) {
				reject(error)
			}
		})
	}

	return {
		login,
		register,
		initAuth,
		useAuthUser,
		useAuthToken,
		useAuthLoading,
		logout
	}
}