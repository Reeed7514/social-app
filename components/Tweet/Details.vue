<template>
	<div>
		<!-- it's not compact -->
		<TweetItem :tweet="props.tweet" />

		<div class="border-y" :class="twitterBorderColor">
			<TweetForm placeholder="Tweet your reply" :user="props.user" :reply-to="props.tweet" @on-success="handleFormSuccess"/>
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

const { twitterBorderColor } = useTailwindConfig();

const replies = computed(() => props.tweet?.replies || []);

async function handleFormSuccess(tweet) {
	await navigateTo({
		path: `/status/${tweet.id}`
	})
}
</script>