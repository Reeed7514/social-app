<template>
	<!-- you can use group -->
	<div @click.stop.prevent="emits('onClick')" class="flex items-center text-gray-500 cursor-pointer group">
		<div class="flex items-center justify-center rounded-full h-8 w-8 dark:group-hover:bg-opacity-20"
			:class="`group-hover:bg-${props.color}-100 group-hover:text-${props.color}-400 ${defaultTransition}`">
			<!-- the classes attribute has info related to props in this component 
				and we can pass this attribute to the element that is going to take this slot  -->
			<slot name="icon" />
		</div>

		<div :class="`group-hover:text-${props.color}-400`" class="ml-1 text-sm">
			<slot />
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	color: {
		type: String,
		required: true
	}
})

const emits = defineEmits(['onClick'])

const { defaultTransition } = useTailwindConfig();
</script>