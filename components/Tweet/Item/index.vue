<template>
	<div>
		<div class="flex gap-3">

			<div class="flex flex-col items-center gap-2">
				<img class="w-10 h-10 rounded-full object-cover" :src="props.tweet.author.profileImage">

				<div v-if="props.showThread" class="bg-gray-300 flex-1 w-[2px] rounded-sm"></div>
			</div>

			<div class="flex-1">
				<div class="flex items-center gap-1">
					<p class="font-semibold text-gray-800 cursor-pointer dark:text-white hover:underline">{{ props.tweet.author.name }}</p>

					<p class="text-gray-400">
						<!-- TODO profile -->
						{{ props.tweet.author.handle }}
					</p>

					<p class="rounded-full bg-gray-400 w-1 h-1"></p>

					<p class="text-gray-400">
						{{ props.tweet.postedAt }}
					</p>


				</div>


				<!-- reply to some tweet -->
				<div v-if="props.tweet.replyTo && props.onProfile" class="mb-1">
					<span class="text-gray-500">
						Replying to
					</span>

					<nuxt-link :to="replyToTweetUrl" class="text-blue-400">
						{{ props.tweet.replyTo.author.handle }}
					</nuxt-link>
				</div>

				<p class="w-full text-gray-800 dark:text-white">
					{{ props.tweet.text }}
				</p>

				<div v-for="image in props.tweet.mediaFiles" :key="image.id" class="flex border-2 rounded-2xl mt-2"
					:class="twitterBorderColor">
					<img :src="image.url" class="w-full rounded-lg">
				</div>


				<!-- quote tweet -->
				<div v-if="props.tweet.quote" @click.stop="redirect(props.tweet.quote)" :class="twitterBorderColor" class="border rounded-md p-2 hover:bg-gray-200 dark:hover:bg-dim-300 mt-1" >
					<TweetQuote :tweet="props.tweet.quote" />
				</div>

				<!-- if we want to reply to this tweet in the modal, then dont show the action icons -->
				<div v-if="!props.noActions" class="-ml-2">
					<TweetItemActions :tweet="props.tweet" compact />
				</div>

			</div>

		</div>


	</div>
</template>

<script setup>
const props = defineProps({
	tweet: {
		type: Object,
		required: true
	},
	showThread: {
		type: Boolean,
		default: false
	},
	noActions: {
		type: Boolean,
		default: false
	},
	onProfile: {
		type: Boolean,
		default: false
	}
})


const { twitterBorderColor } = useTailwindConfig();

const replyToTweetUrl = computed(() => `/status/${props.tweet.replyTo.id}`)


async function redirect(tweet) {
	await navigateTo({
		path: `/status/${tweet.id}`
	})
}
</script>