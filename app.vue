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
				<!-- if its a reply -->
				<div v-if="replyTweet">
					<TweetItem :user="user" :tweet="replyTweet" showThread noActions />
					<!-- thread line -->
					<div class="flex items-center gap-3">
						<!-- thread line -->
						<div class="w-10 h-10 flex justify-center">
							<div class="bg-gray-300 w-[2px] h-8 rounded-sm"></div>
						</div>

						<div class="flex gap-1">
							<span class="text-gray-400">Replying to</span>
							<span class="text-blue-400">{{ replyTweet.author.handle }}</span>
						</div>
					</div>
				</div>

				<TweetForm
					:placeholder="replyTweet ? 'Tweet your reply' : quoteTweet ? 'Add a comment!' : 'What is happening?!'"
					:reply-to="replyTweet" :quote="quoteTweet" :user="user" @on-success="handleFormSuccess">

					<!-- the tweet to quote -->
					<div v-if="quoteTweet" :class="twitterBorderColor" class="border rounded-md p-2 mt-2">

						<TweetQuote :tweet="quoteTweet" />

					</div>

				</TweetForm>
			</UIModal>
		</div>
	</div>
</template>

<script setup>

const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth();

const user = useAuthUser();

provide('user', user)

const isAuthLoading = useAuthLoading();

const { twitterBorderColor } = useTailwindConfig()

const { likeTweet, bookmarkTweet, usePostTweetModal, closePostTweetModal, openPostTweetModal, openPostTweetModalToReply, openPostTweetModalToQuote, useReplyTweet, useQuoteTweet } = useTweets()

const darkMode = ref(false);

const postTweetModal = usePostTweetModal()

const replyTweet = useReplyTweet();

const quoteTweet = useQuoteTweet();

const emitter = useEmitter();

// listen on the comment icon click
emitter.$on('replyTweet', (tweet) => {
	openPostTweetModalToReply(tweet)
})

emitter.$on('quoteTweet', (tweet) => {
	openPostTweetModalToQuote(tweet)
})

emitter.$on('likeTweet', async (tweet) => {
	try {
		await likeTweet(tweet)
	} catch (error) {
		console.log(error)
	}
})

emitter.$on('bookmarkTweet', async (tweet) => {
	try {
		await bookmarkTweet(tweet)
	} catch (error) {
		console.log(error)
	}
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
	openPostTweetModal()
}

async function handleUserLogout() {
	await logout()
}

</script>