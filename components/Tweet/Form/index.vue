<template>
	<div>
		<div v-if="loading" class="flex items-center justify-center">
			<UISpinner class="mx-auto" />
		</div>
		<div v-else>

			<div>
				<div class="flex flex-shrink-0">
					<!-- profile image -->
					<div class="w-12">
						<img :src="props.user?.profileImage" alt="" class="inline-block w-10 h-10 rounded-full object-cover">
					</div>

					<div class="w-full px-2">
						<!-- write tweet -->
						<div class="border-b w-full" :class="twitterBorderColor">
							<textarea v-model="text"
								class="w-full h-26 p-0 pt-2 text-lg text-gray-900 dark:text-white placeholder:text-gray-400 outline-none border-none resize-none bg-transparent border-1 rounded-md focus:ring-0"
								:placeholder="props.placeholder">
										</textarea>
						</div>

						<!-- quote tweet -->
						<slot />


						<!-- Icons -->
						<div class="flex items-center gap-6 my-2">

							<div @click="imageInput.click()" class="text-blue-400 cursor-pointer text-xl">
								<font-awesome-icon icon="fa-solid fa-image" />
							</div>

							<div class="text-blue-400 cursor-pointer text-xl">
								<font-awesome-icon icon="fa-solid fa-square-poll-horizontal" />
							</div>

							<div class="text-blue-400 cursor-pointer text-xl">
								<font-awesome-icon icon="fa-regular fa-face-smile" />
							</div>

							<div class="text-blue-400 cursor-pointer text-xl">
								<font-awesome-icon icon="fa-regular fa-calendar" />
							</div>


							<div class="flex flex-1 justify-end">
								<UIButton size="sm" :disabled="isDisabled" @onClick="handleFormSubmit">
									<strong>
										Tweet
									</strong>
								</UIButton>
								<!-- <button @click="handleFormSubmit">Tweet</button> -->
							</div>

						</div>

						<!-- File Selector -->

						<div>

							<div class="flex flex-wrap gap-4">
								<img v-for="url in imageInputUrls" :key="url" :src="url"
									class="w-32 h-auto object-cover border rounded-md" :class="twitterBorderColor">
							</div>


							<input ref="imageInput" type="file" hidden accept="image/png, image/jpeg, image/gif" multiple
								@change="handleImageChange" :placeholder="props.placeholder">

						</div>

					</div>

				</div>

			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	user: {
		type: Object,
		require: true
	},
	replyTo: {
		type: Object,
		default: null
	},
	quote: {
		type: Object,
		default: null
	},
	placeholder: {
		type: String,
		default: "What is happening?!"
	},
})

const emits = defineEmits(['onSuccess']);

const twitterBorderColor = useTailwindConfig()

const loading = ref(false);

const imageInput = ref();
const selectedFiles = ref([]);
const imageInputUrls = ref([]);
const text = ref('');

const isDisabled = computed(() => text.value === '');

const { postTweet } = useTweets();

onMounted(() => {
	const textarea = document.querySelector('textarea')

	textarea.addEventListener('keyup', event => {
		// console.log('scroll height', event.target.scrollHeight)

		// auto grow textarea
		textarea.style.height = '64px'

		let scHeight = event.target.scrollHeight

		textarea.style.height = scHeight + 'px'
	})
})


function handleImageChange(event) {
	const files = event.target.files

	selectedFiles.value = files;

	// console.log('selected files', selectedFiles.value)

	if (files.length > 0) {
		Array.prototype.forEach.call(files, readFile);
	}
}

function readFile(file) {
	const reader = new FileReader();

	reader.onload = (event) => {
		imageInputUrls.value.push(event.target.result);
	}

	reader.readAsDataURL(file);
}

async function handleFormSubmit() {
	loading.value = true;
	try {

		const response = await postTweet({
			text: text.value,
			mediaFiles: Array.from(selectedFiles.value),
			replyToId: props.replyTo?.id,
			quoteTweetId: props.quote?.id
		})


		emits('onSuccess', response.tweet);
	} catch (error) {
		console.log(error);
	} finally {
		loading.value = false;
	}
}
</script>

<style scoped>

textarea::-webkit-scrollbar{
	width: 0px;
	background: transparent;
}

</style>