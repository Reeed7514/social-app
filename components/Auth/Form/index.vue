<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
    </div>

    <div v-if="login" class="mt-5">

      <AuthFormLogin />

    </div>

    <div v-else class="mt-5">

      <AuthFormRegister @go-to-login="login = !login" />

    </div>

    <div class="flex justify-center mt-5">
      <p v-if="login" @click="login = !login" class="hover:underline cursor-pointer">
        Don't have an account? Register
      </p>

      <p v-else @click="login = !login" class="hover:underline cursor-pointer">
        Already have an account? Login
      </p>
    </div>
  </div>
</template>

<script setup>
const login = ref(true)
</script>
