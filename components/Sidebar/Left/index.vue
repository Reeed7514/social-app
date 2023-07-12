<template>
	<div class="flex flex-col h-screen">

		<div class="p-2 my-2 hover:bg-blue-50 rounded-full dark:hover:bg-white/20 w-min" :class="defaultTransition">
			<nuxt-link to="/">
				<div class="w-8 h-8">
					<LogoTwitter />
				</div>
			</nuxt-link>
		</div>

		<div class="mt-2 space-y-3">
			<SidebarLeftTab active path="/">
				<template v-slot:icon>
					<HomeIcon />
				</template>
				<template v-slot:name>
					Home
				</template>
			</SidebarLeftTab>

			<SidebarLeftTab>
				<template v-slot:icon>
					<InboxIcon />
				</template>
				<template v-slot:name>
					Messages
				</template>
			</SidebarLeftTab>

			<SidebarLeftTab path="/i/bookmarks">
				<template v-slot:icon>
					<BookmarkIcon />
				</template>
				<template v-slot:name>
					Bookmarks
				</template>
			</SidebarLeftTab>

			<SidebarLeftTab>
				<template v-slot:icon>
					<UserIcon />
				</template>
				<template v-slot:name>
					Profile
				</template>
			</SidebarLeftTab>

			<div class="hidden xl:block">
				<UIButton liquid size="lg" @on-click="emits('onTweet')">
					<strong>
						Tweet
					</strong>
				</UIButton>
			</div>

			<div class="block xl:hidden">
				<UIButton @on-click="emits('onTweet')">
					<div class="w-6 h-6 font-bold">
						<PencilIcon />
					</div>
				</UIButton>
			</div>
		</div>

		<div @click="emits('onLogout')"
			class="self-end flex flex-row items-center justify-center px-2 py-2 mx-auto mt-auto mb-5 rounded-full cursor-pointer w-14 xl:w-full hover:bg-gray-100 dark:hover:bg-dim-800"
			:class="defaultTransition">

			<div class="flex flex-row">
				<img :src="props.user.profileImage" class="w-10 h-10 rounded-full object-cover">
				<div class="flex-col hidden ml-2 xl:block">
					<h1 class="text-sm font-bold text-gray-800 dark:text-white">
						{{ user.name }}
					</h1>
					<p class="text-sm text-gray-400">
						{{ user.handle }}
					</p>
				</div>
			</div>

			<!-- ICON -->
			<div class="hidden ml-auto xl:block">

				<div class="w-6 h-6">
					<ChevronDownIcon />
				</div>

			</div>

		</div>

	</div>
</template>

<script setup>
import { HomeIcon } from '@heroicons/vue/24/solid';
import { HashtagIcon, InboxIcon, BookmarkIcon, DocumentTextIcon, UserIcon, PencilIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'


const props = defineProps({
	user: {
		type: Object,
		required: true
	}
})

const emits = defineEmits(['onTweet', 'onLogout'])

const { defaultTransition } = useTailwindConfig();
</script>