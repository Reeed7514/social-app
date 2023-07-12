import { getUserWithBookmarks } from "~/server/db/tweets"
import { tweetTransformer } from "~/server/transformers/tweet";

export default defineEventHandler(async (event) => {

  const { user } = event.context.auth

  let prismaQuery = {
    include: {
      bookmarks: {
        include: {
          // author does not exist on this collection so we have to include it using the relationship we defined
          author: true,

          replyTo: {
            include: {
              author: true
            }
          },
          quote: {
            include: {
              author: true
            }
          },
          replies: {
            include: {
              author: true,
            }
          },
          quotedBy: {
            include: {
              author: true
            }
          },
          likedBy: true,
          bookmarkedBy: true,
          mediaFiles: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    },
  }

  const { bookmarks } = await getUserWithBookmarks(user.id, prismaQuery)

  // console.log('bookmarks from db', bookmarks)

  return {
    tweets: bookmarks.map(tweetTransformer)
  }
})