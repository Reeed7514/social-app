<template>
	<div>

		<!-- it looks like its on the feed(timeline) and TweetItem is designed for feed -->
		<!-- reply chain -->
		<div v-if="replyChain.length > 0">

			<div @click="redirect(tweet)" v-for="tweet in replyChain" :key="tweet.id" :class="defaultTransition"
				class="px-4 pt-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300">

				<TweetItem :tweet="tweet" showThread />

			</div>


		</div>

		<!-- a detailed tweet(could be tweet/quote/reply) that is different from a TweetItem -->

		<TweetInfo :tweet="props.tweet" class="mx-4 mt-2">

			<!-- quote tweet -->
			<div v-if="props.tweet.quote" @click="redirectQuote(props.tweet.quote)" :class="twitterBorderColor"
				class="border rounded-md p-2 hover:bg-gray-200 dark:hover:bg-dim-300 mt-1 cursor-pointer">
				<TweetQuote :tweet="props.tweet.quote" />
			</div>

		</TweetInfo>

		<div class="border-b mx-4 mt-4 pb-4" :class="twitterBorderColor">
			<TweetForm placeholder="Tweet your reply" :user="props.user" :reply-to="props.tweet"
				@on-success="handleFormSuccess" />
		</div>

		<TweetListFeed :tweets="replies" />

	</div>
</template>

<script setup>
const props = defineProps({
	tweet: {
		type: Object,
		required: true
	},
	user: {
		type: Object,
		required: true
	}
});

const { twitterBorderColor, defaultTransition } = useTailwindConfig();

const replies = computed(() => props.tweet?.replies || []);

const replyChain = computed(() => {
	const chain = [];
	let currentTweet = props.tweet;
	while (currentTweet.replyTo) {

		// console.log('currentTweet', currentTweet)
		// console.log('replyto', currentTweet.replyTo)

		chain.unshift(currentTweet.replyTo);
		currentTweet = currentTweet.replyTo;
	}

	// console.log('chain', chain)
	return chain;
})

async function handleFormSuccess(tweet) {
	await navigateTo({
		path: `/status/${tweet.id}`
	})
}

async function redirect(tweet) {
	await navigateTo({
		path: `/status/${tweet.id}`
	})
}

async function redirectQuote(tweet) {
	await navigateTo({
		path: `/status/${tweet.id}`
	})
}


</script>