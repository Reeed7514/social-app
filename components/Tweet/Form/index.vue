<template>
	<div>
		<div v-if="loading" class="flex items-center justify-center">
			<UISpinner  class="mx-auto"/>
		</div>
		<div v-else>
			<!-- if we're on detail page, it has a replyTo but we dont want to show the replyTo -->
			<!-- if we click comment on the feed page, we want to show the replyTo -->
			<!-- if we dont reply, we also dont show the replyTo -->
			<TweetItem v-if="props.replyTo && props.showReplyTo" :tweet="props.replyTo" hideActions />
			<TweetFormInput  :user="props.user" :placeholder="props.placeholder" @on-submit="handleFormSubmit" />
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	user: {
		type: Object,
		require: true
	},
	placeholder: {
		type: String,
		default: "What's happening?"
	},
	// its a tweet
	replyTo: {
		type: Object,
		default: null
	},
	showReplyTo: {
		type: Boolean,
		default: false
	}
})

const emits = defineEmits(['onSuccess']);

const loading = ref(false);

const { postTweet } = useTweets();

async function handleFormSubmit(data) {
	loading.value = true;
	try {

		const response = await postTweet({
			text: data.text,
			mediaFiles: data.mediaFiles,
			replyToId: props.replyTo?.id
		});

		emits('onSuccess', response.tweet);
	} catch (error) {
		console.log(error);
	} finally {
		loading.value = false;
	}
}
</script>