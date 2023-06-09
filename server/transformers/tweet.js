import { mediaTransformer } from "./mediaFile"
import { userTransformer } from "./user"
import human from 'human-time'

export const tweetTransformer = (tweet) => {
	return {
		id: tweet.id,
		text: tweet.text,
		mediaFiles: !!tweet.mediaFiles ? tweet.mediaFiles.map(mediaTransformer) : [],
		author: !!tweet.author ? userTransformer(tweet.author) : null,

		replies: !!tweet.replies ? tweet.replies.map(tweetTransformer) : [],
		replyTo: !!tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
		repliesCount: !!tweet.replies ? tweet.replies.length : 0,

		quotedBy: !!tweet.quotedBy ? tweet.quotedBy.map(tweetTransformer) : [],
		quote: !!tweet.quote ? tweetTransformer(tweet.quote) : null,
		quotedByCount: !!tweet.quotedBy ? tweet.quotedBy.length : 0,

		likedBy: !!tweet.likedBy ? tweet.likedBy.map(userTransformer) : [],
		likedByIds: tweet.likedByIds,
		likedByCount: !!tweet.likedBy ? tweet.likedBy.length : 0,

		bookmarkedBy: !!tweet.bookmarkedBy ? tweet.bookmarkedBy.map(userTransformer) : [],
		bookmarkedByIds: tweet.bookmarkedByIds,
		bookmarkedByCount: !!tweet.bookmarkedBy ? tweet.bookmarkedBy.length : 0,
		
		postedAt: human(tweet.createdAt)
	}
}