<template>
  <div>
    <div class="flex items-center gap-3">


      <img class="w-10 h-10 rounded-full object-cover" :src="props.tweet.author.profileImage">


      <div class="flex flex-col">

        <p class="font-semibold text-gray-800 dark:text-white hover:underline cursor-pointer leading-4">{{
          props.tweet.author.name }}</p>

        <p class="text-gray-400 leading-4">
          <!-- TODO profile -->
          {{ props.tweet.author.handle }}
        </p>

      </div>

    </div>

    <p class="w-full text-gray-800 text-lg dark:text-white mt-4">
      {{ props.tweet.text }}
    </p>

    <div v-for="image in props.tweet.mediaFiles" :key="image.id" class="flex mt-2 mb-2" :class="twitterBorderColor">
      <img :src="image.url" class="w-full rounded-lg">
    </div>

    <!-- quote tweet -->

    <slot />

    <div class="mt-3 pb-3 border-b" :class="twitterBorderColor">
      <span class="text-gray-400 hvoer:underline">
        {{ $localDate(props.tweet.updatedAt) }}
      </span>

      <span class="ml-2">
        {{ randNum() + ' Views' }}
      </span>
    </div>

    <div class="py-3" :class="twitterBorderColor">

      <TweetInfoStats :tweet="props.tweet" />

    </div>


    

  </div>
</template>

<script setup>

const props = defineProps({
  tweet: {
    type: Object,
    required: true
  }
})

const { $localDate } = useNuxtApp()

const emitter = useEmitter()

const twitterBorderColor = useTailwindConfig()



function handleCommentClick() {
  emitter.$emit('replyTweet', props.tweet)
}

// 0-1000
function randNum() {
  return Math.floor(Math.random() * 1000)
}

</script>