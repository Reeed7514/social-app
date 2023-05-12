<template>
	<div>
		<div class="relative m-2">
			<div class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer">
				<div class="w-6 h-6">
					<MagnifyingGlassIcon @click="handleSearch" />
				</div>
			</div>
			<input v-model="search"
				class="flex items-center w-full pl-12 text-sm font-normal text-black bg-gray-200 border border-gray-200 rounded-full shadow dark:text-gray-100 dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 h-9"
				placeholder="Search tweet" type="text">
		</div>


		<SidebarRightPreviewCard title="What's happening">
			<SidebarRightPreviewCardItem v-for="whatsHappening in whatsHappeningItems" :key="whatsHappening.title">
				<div>
					<h2>{{ whatsHappening.title }}</h2>
					<p>{{ whatsHappening.tweetsCount + ' tweets' }}</p>
				</div>
			</SidebarRightPreviewCardItem>
		</SidebarRightPreviewCard>

		<SidebarRightPreviewCard title="Who to follow">
			<SidebarRightPreviewCardItem v-for="whoToFollow in whoToFollowItems">
				<div class="flex flex-row items-center justify-between p-2">
					<div class="flex flex-row">
						<img class="w-10 h-10 rounded-full" :src="whoToFollow.image" :alt="whoToFollow.name">

						<div class="flex flex-col ml-2">
							<h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ whoToFollow.name }}</h1>
							<p class="text-xs text-gray-400">{{ whoToFollow.handle }}</p>
						</div>
					</div>
					<button
						class="px-4 py-2 text-xs font-bold text-white bg-black rounded-full dark:text-black dark:bg-white">Follow</button>
				</div>
			</SidebarRightPreviewCardItem>
		</SidebarRightPreviewCard>

		<footer>
			<ul class="mx-2 my-4 text-xs text-gray-500">
				<li class="inline-block mx-2">
					<a href="#" class="hover:underline" @click.prevent="handleToggleDarkMode">Dark mode</a>
				</li>
				<li class="inline-block mx-2">
					<a href="#" class="hover:underline">Privacy Policy</a>
				</li>
				<li class="inline-block mx-2">
					<a href="#" class="hover:underline">Cookie Policy</a>
				</li>
				<li class="inline-block mx-2">
					<a href="#" class="hover:underline">Accessability</a>
				</li>
				<li class="inline-block mx-2">
					<a href="#" class="hover:underline">Ads info</a>
				</li>
				<li class="inline-block mx-2">
					<a href="#" class="hover:underline">More</a>
				</li>
				<li class="inline-block mx-2">
					© 2022 Twitter, Inc.
				</li>
			</ul>
		</footer>
	</div>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const whatsHappeningItems = ref([
	{
		title: 'Lebron',
		tweetsCount: 12
	},
	{
		title: 'Lakers',
		tweetsCount: 20
	},
	{
		title: 'May the 4th',
		tweetsCount: 18
	},
])

const whoToFollowItems = ref([
	{
		name: 'Joe Biden',
		handle: '@JoeBiden',
		image: 'https://picsum.photos/200/200'
	},
	{
		name: 'Joe Biden',
		handle: '@JoeBiden',
		image: 'https://picsum.photos/200/200'
	},
	{
		name: 'Joe Biden',
		handle: '@JoeBiden',
		image: 'https://picsum.photos/200/200'
	}
])
const emitter = useEmitter()
const search = ref('')

async function handleSearch() {
	await navigateTo({
		path: '/search',
		query: {
			search: search.value
		}
	})
}

function handleToggleDarkMode(){
	emitter.$emit('toggleDarkMode')
}
</script>