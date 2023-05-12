<template>
	<div class="flex items-center gap-8 w-full">

		<TweetItemActionsIcon color="blue" :size="size" @on-click="emits('onCommentClick')">
			<!-- take the attribute that child component provides and give it to the icon -->
			<template v-slot:icon="{ classes }">
				<ChatBubbleLeftEllipsisIcon :class="classes" />
			</template>

			<template v-if="showStats" v-slot:default>
				{{ props.tweet.repliesCount }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon color="green" :size="size">
			<!-- take the attribute that child component provides and give it to the icon -->
			<template v-slot:icon="{ classes }">
				<ArrowPathIcon :class="classes" />
			</template>

			<template v-if="showStats" v-slot:default>
				{{ randNum() }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon color="red" :size="size">
			<!-- take the attribute that child component provides and give it to the icon -->
			<template v-slot:icon="{ classes }">
				<HeartIcon :class="classes" />
			</template>

			<template v-if="showStats" v-slot:default>
				{{ randNum() }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon color="blue" :size="size">
			<!-- take the attribute that child component provides and give it to the icon -->
			<template v-slot:icon="{ classes }">
				<BookmarkIcon :class="classes" />
			</template>

			<template v-if="showStats" v-slot:default>
				{{ randNum() }}
			</template>
		</TweetItemActionsIcon>


	</div>
</template>

<script setup>
import { ChatBubbleLeftEllipsisIcon, HeartIcon, ArrowPathIcon, BookmarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
	tweet: {
		type: Object,
		required: true
	},
	compact: {
		type: Boolean,
		default: false
	}
})

const emits = defineEmits(['onCommentClick'])

const showStats = computed(() => props.compact);

const size = computed(() => props.compact ? 5 : 8);

function randNum() {
	return Math.floor(Math.random() * 100)
}

</script>