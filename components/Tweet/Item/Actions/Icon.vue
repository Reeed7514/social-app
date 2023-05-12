<template>
	<!-- you can use group -->
	<div @click.stop.prevent="emits('onClick')" class="flex items-center text-gray-400 cursor-pointer group">
		<div
			:class="`p-2 rounded-full group-hover:bg-${props.color}-100 group-hover:text-${props.color}-400 dark:group-hover:bg-opacity-20 ${defaultTransition}`">
			<!-- the classes attribute has info related to props in this component 
				and we can pass this attribute to the element that is going to take this slot  -->
			<slot name="icon" :classes="`w-${props.size} h-${props.size}`" />
		</div>

		<span :class="`group-hover:text-${props.color}-400`">
			<slot />
		</span>
	</div>
</template>

<script setup>
const props = defineProps({
	color: {
		type: String,
		required: true
	},
	size: {
		type: Number,
		required: true
	}
})

const emits = defineEmits(['onClick'])

const { defaultTransition } = useTailwindConfig();
</script>