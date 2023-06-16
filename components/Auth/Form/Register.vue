<template>
  <div class="space-y-6">
    <UIInput label="Username" v-model="data.username" placeholder="@username" />
    <UIInput label="Name" v-model="data.name" placeholder="Your Name" />
    <UIInput label="Email" v-model="data.email" placeholder="johndoe@gmail.com" />
    <UIInput label="Password" v-model="data.password" placeholder="********" type="password" />
    <UIInput label="Repeat Password" v-model="data.repeatPassword" placeholder="********" type="password" />

    <div v-if="errorMsg" class="flex justify-center">
      <p class="text-red-400">
        {{ errorMsg }}
      </p>
    </div>


    <UIButton @click="handleRegister" liquid :disabled="isButtonDisabled">
      Register
    </UIButton>
  </div>
</template>

<script setup>
const emits = defineEmits(['goToLogin'])

const data = reactive({
  username: '',
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
  loading: false
})

const errorMsg = ref(null)

const isButtonDisabled = computed(() => {
  return (!data.username || !data.password || !data.name || !data.email || !data.repeatPassword) || data.loading
})

const { register } = useAuth()


async function handleRegister() {
  data.loading = true;
  try {
    await register({
      username: data.username,
      name: data.name,
      email: data.email,
      password: data.password,
      repeatPassword: data.repeatPassword
    })

    emits('goToLogin')

  } catch (error) {

    errorMsg.value = error.statusMessage

  } finally {
    data.loading = false;
  }
}


</script>