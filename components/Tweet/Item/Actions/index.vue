<template>
	<div class="flex items-center w-full" :class="props.compact ? 'gap-8' : 'justify-center gap-16'">

		<TweetItemActionsIcon color="blue" @on-click="handleReplyClick">
			<template #icon>
				<font-awesome-icon icon="fa-regular fa-comment" :size="size"/>
			</template>

			<template v-if="showStats">
				{{ props.tweet.repliesCount }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon color="green" @on-click="handleQuoteClick">
			<!-- take the attribute that child component provides and give it to the icon -->
			<template #icon>
				<font-awesome-icon icon="fa-solid fa-retweet" :size="size"/>
			</template>

			<template v-if="showStats">
				{{ props.tweet.quotedByCount }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon color="red">
			<!-- take the attribute that child component provides and give it to the icon -->
			<template #icon>
				<font-awesome-icon icon="fa-regular fa-heart" :size="size"/>
			</template>

			<template v-if="showStats">
				{{ randNum() }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon color="blue">
			<!-- take the attribute that child component provides and give it to the icon -->
			<template #icon>
				<font-awesome-icon icon="fa-solid fa-fire" :size="size"/>
			</template>

			<template v-if="showStats">
				{{ randNum() }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon color="blue">
			<!-- take the attribute that child component provides and give it to the icon -->
			<template #icon>
				<font-awesome-icon icon="fa-regular fa-bookmark" :size="size"/>
			</template>

			<template v-if="showStats">
				{{ randNum() }}
			</template>
		</TweetItemActionsIcon>
		

	</div>
</template>

<script setup>

const props = defineProps({
	tweet: {
		type: Object,
		required: true
	},
	compact: {
		type: Boolean,
		default: false
	}
})


const emits = defineEmits(['replyTweet', 'quoteTweet'])

const emitter = useEmitter()


const showStats = computed(() => props.compact);

const size = computed(() => props.compact ? 'sm' : 'lg');

function randNum() {
	return Math.floor(Math.random() * 100)
}

// use emitter from mitt to emit the event directly to app.vue
function handleReplyClick() {
	emitter.$emit('replyTweet', props.tweet)
}

function handleQuoteClick() {
	emitter.$emit('quoteTweet', props.tweet)
}

</script>