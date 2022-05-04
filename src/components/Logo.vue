<template>
  <router-link class="logo-link" to="/projects" aria-label="Go to projects page">
    <img :src="logoSrc" alt="link logo">
  </router-link>
</template>

<script>
import logoSvg from '@/assets/images/icon/logo.svg'
export default {
  name: "Logo",
  data() {
    return {
      logoSrc: logoSvg
    }
  },
  computed: {
    imgSrc () {
      return require('@/assets/images/icon/logo.svg')
    }
  }
}
</script>