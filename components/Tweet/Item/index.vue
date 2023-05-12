<template>
	<div>
		<TweetItemHeader :tweet="tweet" />

		<div :class="wrapperClasses">

			<p class="flex-shrink w-auto font-medium text-gray-800 dark:text-white" :class="textSize">
				{{ props.tweet.text }}
			</p>

			<div v-for="image in tweet.mediaFiles" :key="image.id" class="flex my-3 mr-2 border-2 rounded-2xl"
				:class="twitterBorderColor">
				<img :src="image.url" class="w-full rounded-2xl">
			</div>

		</div>
		<div v-if="!props.hideActions" class="mt-2 mx-14">
			<TweetItemActions :tweet="props.tweet" :compact="props.compact" @on-comment-click="handleCommentClick"/>
		</div>
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
	hideActions: {
		type: Boolean,
		default: false
	}
})

const emits = defineEmits(['replyTweet'])

const emitter = useEmitter();

const { twitterBorderColor } = useTailwindConfig();

const wrapperClasses = computed(() => props.compact ? 'ml-16' : 'ml-4 mt-4');

const textSize = computed(() => props.compact ? 'text-base' : 'text-2xl');

// use emitter from mitt to emit the event directly to app.vue
function handleCommentClick(){
	emitter.$emit('replyTweet', props.tweet)
}
</script>