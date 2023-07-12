<template>
  <div class="flex gap-4">

    <p>
      <span> {{ props.tweet.repliesCount }}</span>
      <span class="text-gray-500 ml-1">Replies</span>
    </p>

    <p>
      <span> {{ props.tweet.quotedByCount }}</span>
      <span class="text-gray-500 ml-1">Quotes</span>
    </p>

    <p>
      <span> {{ props.tweet.likedByCount }}</span>
      <span class="text-gray-500 ml-1">Likes</span>
    </p>

    <p>
      <span> {{ props.tweet.bookmarkedByCount }}</span>
      <span class="text-gray-500 ml-1">Bookmarks</span>
    </p>

  </div>
</template>

<script setup>
const props = defineProps({
  tweet: {
    type: Object,
    required: true
  }
})

// 0-1000
function randNum() {
  return Math.floor(Math.random() * 1000)
}

</script>