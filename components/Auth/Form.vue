<template>
	<div class="w-full">

		<div class="flex justify-center">
			<div class="w-10 h-10">
				<LogoTwitter />
			</div>
		</div>

		<div class="pt-5 space-y-6">
			<UIInput label="Username" v-model="data.username" placeholder="@username" />
			<UIInput label="Password" v-model="data.password" placeholder="********" type="password" />

			<UIButton @click="handleLogin" liquid :disabled="isButtonDisabled">
				Login
			</UIButton>
		</div>
	</div>
</template>

<script setup>
const data = reactive({
	username: '',
	password: '',
	loading: true
})

const isButtonDisabled = computed(() => {
	return (!data.username || !data.password) || data.loading
})

const { login } = useAuth();
async function handleLogin() {
	data.loading = true;
	try {
		await login({
			username: data.username,
			password: data.password
		})
	} catch (error) {
		console.log(error);
	} finally {
		data.loading = false;
	}
}


</script>