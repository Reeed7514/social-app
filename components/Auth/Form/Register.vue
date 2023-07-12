<template>
  <div class="space-y-6">
    <UIInput label="Username" v-model="data.username" placeholder="@username" />
    <UIInput label="Name" v-model="data.name" placeholder="Your Name" />
    <UIInput label="Email" v-model="data.email" placeholder="johndoe@gmail.com" />
    <UIInput label="Password" v-model="data.password" placeholder="********" type="password" />
    <UIInput label="Repeat Password" v-model="data.repeatPassword" placeholder="********" type="password" />

    <div @click="imageInput.click()" class="mx-auto w-max border border-slate-200 hover:bg-gray-200 rounded-2xl py-1 px-2 cursor-pointer">
      Choose your profile picture
    </div>

    <div class="mx-auto w-max">
      <img v-if="imageUrl" :src="imageUrl" class="w-20 h-20 object-cover border border-slate-200 rounded-full ring-1">
    </div>

    <input ref="imageInput" type="file" hidden accept="image/png, image/jpeg, image/gif" @change="handleImageChange">


    <div v-if="errorMsg" class="mx-auto">
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

const imageInput = ref()

const selectedProfileImage = ref(null)

const imageUrl = ref(null)

const errorMsg = ref(null)

const isButtonDisabled = computed(() => {
  return (!data.username || !data.password || !data.name || !data.email || !data.repeatPassword || !selectedProfileImage.value) || data.loading
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
      repeatPassword: data.repeatPassword,
      profileImage: selectedProfileImage.value
    })

    emits('goToLogin')

  } catch (error) {

    errorMsg.value = error.statusMessage

  } finally {
    data.loading = false;
  }
}

function handleImageChange(event) {

  // console.log(event.target.files[0])

  const file = event.target.files[0]

  selectedProfileImage.value = file

  const reader = new FileReader()

  reader.onload = (e) => {
    imageUrl.value = e.target.result
  }

  reader.readAsDataURL(file)
}


</script>