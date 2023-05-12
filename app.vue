<template>
	<div :class="{ 'dark': darkMode }">
		<div class="bg-white dark:bg-dim-900">
			<!-- loading auth -->
			<LaodingPage v-if="isAuthLoading" />

			<!-- authorized -->
			<div v-else-if="user" class="min-h-full">
				<div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
					<!-- left sidebar -->
					<div class="hidden md:block xs-col-span-1 xl:col-span-2">
						<div class="sticky top-0">
							<SidebarLeft :user="user" @on-tweet="handleOpenTweetModal" @on-logout="handleUserLogout" />
						</div>
					</div>
					<!-- main content -->
					<main class="col-span-12 md:col-span-8 xl:col-span-6">
						<router-view />
					</main>
					<!-- right sidebar -->
					<div class="hidden col-span-12 md:block xl:col-span-4 md:col-span-3">
						<div class="sticky top-0">
							<SidebarRight />
						</div>
					</div>
				</div>
			</div>

			<!-- unauthorized -->
			<AuthPage v-else />

			<UIModal :is-open="postTweetModal" @on-close="handleModalClose">

				<TweetForm :replyTo="replyTweet" showReplyTo :user="user" @on-success="handleFormSuccess" />
			</UIModal>
		</div>
	</div>
</template>

<script setup>
const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth();

const user = useAuthUser();
const isAuthLoading = useAuthLoading();

const { usePostTweetModal, closePostTweetModal, openPostTweetModal, useReplyTweet } = useTweets()

const darkMode = ref(false);

const postTweetModal = usePostTweetModal()

const replyTweet = useReplyTweet();

const emitter = useEmitter();

// listen on the comment icon click
emitter.$on('replyTweet', (tweet) => {
	openPostTweetModal(tweet)
})

emitter.$on('toggleDarkMode', () => darkMode.value = !darkMode.value)

// onMount is not gonna work
onBeforeMount(async () => {
	// refresh token and set token
	try {
		await initAuth()
	} catch (error) { }
})

// TODO update feed
async function handleFormSuccess() {
	closePostTweetModal()
}

function handleModalClose() {
	closePostTweetModal()
}

// open from sidebar, not replying to anyone
function handleOpenTweetModal() {
	openPostTweetModal(null)
}

async function handleUserLogout() {
	await logout()
}

</script>
