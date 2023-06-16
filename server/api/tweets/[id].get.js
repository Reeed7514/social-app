import { getTweetById } from "~/server/db/tweets";
import { tweetTransformer } from "~/server/transformers/tweet";


function recursive(level) {
	if (level === 0) {
		return {
			include: {
				author: true,
				mediaFiles: true,
				replyTo: true,
				replies: true,
			}
		}
	}
	return {
		include: {
			author: true,
			mediaFiles: true,
			replyTo: recursive(level - 1),
			replies: true,
		}
	}
}

export default defineEventHandler(async (event) => {



	const { id } = event.context.params;

	// const tweet = await getTweetById(id, {
	// 	include: {
	// 		author: true,
	// 		mediaFiles: true,
	// 		replyTo: {
	// 			include: {
	// 				author: true,
	// 				mediaFiles: true,
	// 				replies: true
	// 			},
	// 		},
	// 		replies: {
	// 			include: {
	// 				author: true,
	// 				mediaFiles: true,
	// 				replies: true,
	// 			}
	// 		},
	// 	},
	// }
	// )


	// nested relations (replyTo)
	const tweet = await getTweetById(id, {
		include: {
			author: true,
			mediaFiles: true,
			replyTo: recursive(5),
			replies: {
				include: {
					author: true,
					mediaFiles: true,
					replies: true,
				}
			},
			quote: {
				include :{
					author: true,
					mediaFiles: true,
				}
			},
			quotedBy: true
		},
	}
	)

	// console.log(tweet)

	return {
		tweet: tweetTransformer(tweet)
	}

})