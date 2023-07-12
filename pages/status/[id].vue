<template>
	<div>
		<MainSection title="Thread" :loading="loading">

			<Head>
				<Title>
					Tweet
				</Title>
			</Head>
			
			<TweetDetails :tweet="tweet" />

		</MainSection>

	</div>
</template>

<script setup>
const { getTweetById } = useTweets();

const route = useRoute();

const id = computed(() => route.params.id);

const loading = ref(false);

const tweet = ref(null);

watch(() => useRoute().fullPath, async () => {
	await getTweet();
});


async function getTweet() {
	loading.value = true;
	try {
		const response = await getTweetById(id.value);

		tweet.value = response.tweet;
	} catch (error) {
		console.log(error);
	} finally {
		loading.value = false;
	}
}

onBeforeMount(async () => {
	await getTweet();
})

</script>