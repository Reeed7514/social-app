import { likeTweet, unlikeTweet } from "~/server/db/tweets"

// like tweet
export default defineEventHandler(async (event) => {
  const { tweet } = await readBody(event)

  // console.log('like.post.js?')

  const { user } = event.context.auth

  // console.log('user', user)

  const liked = user.likedTweetsIds?.includes(tweet.id)


  if (!liked) {
    await likeTweet(tweet.id, user.id)
  } else {
    await unlikeTweet(tweet.id, user.id)
  }

})