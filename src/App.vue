<template>
  <div class="dasha">
    <Header/>
    <router-view/>

  </div>
</template>

<script>
import TodoList from "@/components/Todo/TodoList";
import AddTodo from "@/components/Todo/AddTodo";
import Header from "@/components/Header";
export default {
  name: 'App',
  components: {
    TodoList,
    AddTodo,
    Header
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
