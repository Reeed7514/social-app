<template>
	<nuxt-link to="/" class="flex items-center gap-4 text-black p-3 rounded-full w-min hover:bg-gray-200 dark:hover:bg-dim-200 dark:text-white" :class="defaultTransition">
		<div class="w-6 h-6 text-dark">
			<slot name="icon" />
		</div>

		<div class="text-xl hidden xl:block" :class="textClasses">
			<slot name="name" />
		</div>
	</nuxt-link>
</template>

<script setup>
const {defaultTransition} = useTailwindConfig();

const props = defineProps({
	active: {
		type: Boolean,
		default: false
	}
});

const textClasses = computed(() => props.active? 'font-semibold' : 'font-normal');

</script>