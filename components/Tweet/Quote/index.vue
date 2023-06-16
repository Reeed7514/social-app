<template>
  <div>

    <!-- header -->
    <div class="flex items-center gap-2">

      <img class="w-5 h-5 rounded-full" :src="props.tweet.author.profileImage">

      <div class="flex items-center gap-1">

        <p class="font-semibold text-gray-800 dark:text-white hover:underline">{{ props.tweet.author.name }}</p>

        <p class="text-gray-400">
          <!-- TODO profile -->
          {{ props.tweet.author.handle }}
        </p>

        <p class="rounded-full bg-gray-400 w-1 h-1"></p>

        <p class="text-gray-400">
          {{ props.tweet.postedAt }}
        </p>

      </div>
    </div>

    <!-- content -->
    <div>

      <p class="w-full text-gray-800 dark:text-white">
        {{ props.tweet.text }}
      </p>

      <div v-for="image in props.tweet.mediaFiles" :key="image.id" class="flex border-2 rounded-2xl"
        :class="twitterBorderColor">
        <img :src="image.url" class="w-full rounded-2xl">
      </div>

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

const {twitterBorderColor} = useTailwindConfig()

</script>