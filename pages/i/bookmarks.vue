<template>
  <div>
    <MainSection title="Bookmarks" :loading="loading">

      <Head>
        <Title>
          Bookmarks / Twitter
        </Title>
      </Head>

      <div v-if="bookmarks">

        <TweetListFeed :tweets="bookmarks" />

      </div>

      <div v-else class="flex justify-center">
        No bookmarks yet.
      </div>
    </MainSection>
  </div>
</template>

<script setup>
const loading = ref(false)

const { getUserBookmarks } = useTweets()

const bookmarks = ref(null)

onBeforeMount(async () => {
  await loadUserBookmarks()
})

async function loadUserBookmarks() {
  loading.value = true;
  try {
    const { tweets } = await getUserBookmarks();

    bookmarks.value = tweets
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>