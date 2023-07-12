<template>
	<div class="flex items-center w-full" :class="props.compact ? 'gap-8' : 'justify-center gap-16'">

		<TweetItemActionsIcon color="blue" @on-click="handleReplyClick">
			<template #icon>
				<font-awesome-icon icon="fa-regular fa-comment" :size="size" />
			</template>

			<template v-if="props.compact">
				{{ tweet.repliesCount }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon color="green" @on-click="handleQuoteClick">
			<!-- take the attribute that child component provides and give it to the icon -->
			<template #icon>
				<font-awesome-icon icon="fa-solid fa-retweet" :size="size" />
			</template>

			<template v-if="props.compact">
				{{ tweet.quotedByCount }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon :active="liked" color="red" @on-click="handleLikeClick">
			<!-- take the attribute that child component provides and give it to the icon -->
			<template #icon>
				<font-awesome-icon v-if="liked" icon="fa-solid fa-heart" :size="size" />
				<font-awesome-icon v-else icon="fa-regular fa-heart" :size="size" />
			</template>

			<template v-if="props.compact">
				{{ tweet.likedByCount }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon :active="bookmarked" color="blue" @on-click="handleBookmarkClick">
			<!-- take the attribute that child component provides and give it to the icon -->
			<template #icon>
				<font-awesome-icon v-if="bookmarked" icon="fa-solid fa-bookmark" :size="size" />
				<font-awesome-icon v-else icon="fa-regular fa-bookmark" :size="size" />
			</template>

			<template v-if="props.compact">
				{{ tweet.bookmarkedByCount }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon color="blue">
			<!-- take the attribute that child component provides and give it to the icon -->
			<template #icon>
				<font-awesome-icon icon="fa-solid fa-fire" :size="size" />
			</template>

			<template v-if="props.compact">
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
	},
})

const emits = defineEmits(['replyTweet', 'quoteTweet', 'likeTweet'])

const emitter = useEmitter()

const user = inject('user')

const tweet = ref(props.tweet)

const liked = ref(props.tweet.likedByIds.includes(user.value.id))

const bookmarked = ref(props.tweet.bookmarkedByIds.includes(user.value.id))


const size = computed(() => props.compact ? 'sm' : 'lg');

function randNum() {
	return Math.floor(Math.random() * 100)
}

// use emitter from mitt to emit the event directly to app.vue
function handleReplyClick() {
	emitter.$emit('replyTweet', tweet.value)
}

function handleQuoteClick() {
	emitter.$emit('quoteTweet', tweet.value)
}

function handleLikeClick() {
	// console.log('like tweet')

	liked.value = !liked.value
	liked.value ? tweet.value.likedByCount++ : tweet.value.likedByCount--

	emitter.$emit('likeTweet', tweet.value)
}

function handleBookmarkClick(){
	bookmarked.value = !bookmarked.value
	bookmarked.value ? tweet.value.bookmarkedByCount++ : tweet.value.bookmarkedByCount--

	emitter.$emit('bookmarkTweet', tweet.value)
}

</script>