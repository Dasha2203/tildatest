<template>
  <nav class="navigation">
    <router-link class="navigation-link" to="/projects">Мои сайты</router-link>
    <router-link class="navigation-link" to="/profile">Профиль</router-link>
    <router-link class="navigation-link" to="/todo">Todo</router-link>
  </nav>
</template>

<script>
export default {
  name: "Navigation"
}
</script>

<style scoped>

.navigation {
  display: flex;
  justify-content: flex-start;
}

  .navigation .navigation-link:not(:last-child) {
    margin-right: 30px;
  }

  .navigation-link {
    padding-top: 14px;
    padding-bottom: 14px;
    /*height: 57px;*/
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    transition: all .2s ease-in;
    border-bottom: 3px solid transparent;
  }

  .navigation-link.router-link-active {
    border-bottom: 3px solid #f4846b;
  }

  .navigation-link:hover {
    color: #f4846b;
    border-bottom: 3px solid #f4846b;
  }

</style>