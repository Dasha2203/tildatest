<template>
  <router-link class="logo-link" to="/projects" aria-label="Go to projects page">
    <img src="@/assets/images/icon/options.svg" alt="link logo">
  </router-link>
</template>

<script>
export default {
  name: "Logo",
  computed: {
    imgSrc () {
      return require('@/assets/images/icon/logo.svg')
    }
  }
}
</script>