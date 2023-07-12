import prisma from '.'

export const createTweet = (tweetData) => {
	return prisma.tweet.create({
		data: tweetData
	})
}

export const likeTweet = (tweetId, userId) => {
	return prisma.tweet.update({
		where: {
			id: tweetId
		},
		data: {
			likedBy: {
				connect: {
					id: userId
				}
			}
		},
		include: {
			likedBy: true
		}
	})
}

export const unlikeTweet = (tweetId, userId) => {
	return prisma.tweet.update({
		where: {
			id: tweetId
		},
		data: {
			likedBy: {
				disconnect: {
					id: userId
				}
			}
		},
		include: {
			likedBy: true
		}
	})
}

export const bookmarkTweet = (tweetId, userId) => {
	return prisma.tweet.update({
		where: {
			id: tweetId
		},
		data: {
			bookmarkedBy: {
				connect: {
					id: userId
				}
			}
		},
		include: {
			bookmarkedBy: true
		}
	})
}

export const unbookmarkTweet = (tweetId, userId) => {
	return prisma.tweet.update({
		where: {
			id: tweetId
		},
		data: {
			bookmarkedBy: {
				disconnect: {
					id: userId
				}
			}
		},
		include: {
			bookmarkedBy: true
		}
	})
}


export const getTweets = (params = {}) => {
	return prisma.tweet.findMany({
		...params
	})
}

export const getLikedTweets = (userId) => {
	return prisma.tweet.findMany({
		...params,
		where: {
			likedBy: {
				some: {
					id: userId
				}
			}
		}
	})
}

export const getUserWithBookmarks = (userId, params = {}) => {
	return prisma.user.findUnique({
		// make sure the where clause doesnt override the where in params
		...params,
		where: {
			...params.where,
			id: userId
		}
	})
}


export const getTweetById = (tweetId, params = {}) => {
	return prisma.tweet.findUnique({
		// make sure the where clause doesnt override the where in params
		...params,
		where: {
			...params.where,
			id: tweetId
		}
	})
}