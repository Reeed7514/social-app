<template>
	<div>
		<MainSection title="Home" :loading="loading">

			<Head>
				<Title>
					Search
				</Title>
			</Head>

			<TweetListFeed :tweets="homeTweets" />
		</MainSection>

	</div>
</template>

<script setup>
const loading = ref(false);
const { getTweets } = useTweets();

const homeTweets = ref([]);

onBeforeMount(async () => {
	await loadHomeTweets();
})

async function loadHomeTweets() {
	loading.value = true;
	try {
		const { tweets } = await getTweets({
			search: useRoute().query.search
		});

		homeTweets.value = tweets;
	} catch (error) {
		console.log(error);
	} finally {
		loading.value = false;
	}
}

</script>