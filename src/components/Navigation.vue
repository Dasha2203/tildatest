<template>
  <nav class="navigation">
    <router-link class="navigation-link logo" to="/projects" aria-label="Go to projects page">
      <img :src="require('@/assets/images/icon/logo.svg')" alt="link logo">
    </router-link>
    <router-link class="navigation-link" to="/projects">Мои сайты</router-link>
    <router-link class="navigation-link" to="/profile">Профиль</router-link>
  </nav>
</template>

<script>
export default {
  name: "Navigation"
}
</script>
