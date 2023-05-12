import { getTweets } from "~/server/db/tweets"
import { tweetTransformer } from "~/server/transformers/tweet";

export default defineEventHandler(async (event) => {

	const { search } = getQuery(event);


	let prismaQuery = {
		include: {
			// author does not exist on this collection so we have to include it using the relationship we defined
			author: true,
			replyTo: {
				include: {
					author: true
				}
			},
			replies: {
				include: {
					author: true,
				}
			},
			mediaFiles: true
		},
		orderBy: {
			createdAt: 'desc'
		}
	}

	if(!!search){
		prismaQuery = {
			...prismaQuery,
			where: {
				text: {
					contains: search
				}
			}
		}
	}

	const tweets = await getTweets(prismaQuery)

	return {
		tweets: tweets.map(tweetTransformer)
	}
})