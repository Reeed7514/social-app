<template>
	<div>
		<div v-if="noTweets" class="p-4">
			<p class="text-center text-gray-500">
				No tweets for now.
			</p>
		</div>
		<div v-else v-for="tweet in props.tweets" :key="tweet.id" @click="redirect(tweet)"
			:class="[twitterBorderColor, defaultTransition]"
			class="py-2 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300">
			<TweetItem :tweet="tweet" compact />
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	tweets: {
		type: Array,
		required: true
	}
})

const { twitterBorderColor, defaultTransition } = useTailwindConfig();

const noTweets = computed(() => props.tweets.length === 0);

async function redirect(tweet) {
	await navigateTo({
		path: `/status/${tweet.id}`
	})
}
</script>