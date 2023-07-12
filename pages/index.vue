<template>
	<div>
		<MainSection title="Home" :loading="loading">

			<Head>
				<Title>
					Home / Twitter
				</Title>
			</Head>
			<div class="p-4 border-b" :class="twitterBorderColor">
				<TweetForm @on-success="handleFormSuccess" />
			</div>
			<TweetListFeed :tweets="homeTweets" />
		</MainSection>

	</div>
</template>

<script setup>
const loading = ref(false);
const { twitterBorderColor } = useTailwindConfig();
const { getTweets } = useTweets();


const homeTweets = ref([]);


onBeforeMount(async () => {
	await loadHomeTweets();
})

async function handleFormSuccess() {
	await loadHomeTweets();
}

async function loadHomeTweets() {
	loading.value = true;
	try {
		const { tweets } = await getTweets();

		homeTweets.value = tweets;
	} catch (error) {
		console.log(error);
	} finally {
		loading.value = false;
	}
}

</script>