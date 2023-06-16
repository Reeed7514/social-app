// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

	modules: [
		'@nuxtjs/tailwindcss',
		'@nuxtjs/google-fonts'
	],


	googleFonts: {
		families: {
			Roboto: true,
			Raleway: [300, 400, 500, 600, 700],
		}
	},

	runtimeConfig: {
		jwtAccessSecret: process.env.ACCESS_SECRET,
		jwtRefreshSecret: process.env.REFRESH_SECRET,
		cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
		cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
		cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
	},

	css: [
		'@fortawesome/fontawesome-svg-core/styles.css'
	]
})
