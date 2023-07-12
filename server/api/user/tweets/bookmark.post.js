import { bookmarkTweet, unbookmarkTweet } from "~/server/db/tweets"

// like tweet
export default defineEventHandler(async (event) => {
  const { tweet } = await readBody(event)

  // console.log('like.post.js?')

  const { user } = event.context.auth

  // console.log('user', user)

  const bookmarked = user.bookmarkedTweetsIds?.includes(tweet.id)


  if (!bookmarked) {
    await bookmarkTweet(tweet.id, user.id)
  } else {
    await unbookmarkTweet(tweet.id, user.id)
  }

})