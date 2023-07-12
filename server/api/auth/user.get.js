import { userTransformer } from "~/server/transformers/user"

export default defineEventHandler(async (event) => {
	// console.log('transformed user', userTransformer(event.context.auth?.user))
	return {
		user: userTransformer(event.context.auth?.user)
	}
})