<template>
  <div>
    <ul>
      <TodoItem
          v-for="(todo, i) of todos"
          v-bind:todo="todo"
          v-bind:index="i"
          v-bind:key="todo.id"
          v-on:remove-todo="removeTodo"
          v-on:change-complete="changeTodoCompleted"
      />
    </ul>
  </div>
</template>

<script>
import TodoItem from "@/components/Todo/TodoItem";

export default {
  name: "TodoList",
  props: ["todos"],
  components: {
    TodoItem
  },
  methods: {
    changeTodoCompleted(id) {
      // let i = this.todos.findIndex(t => t.id === id);
      // this.todos[i].completed = !this.todos[i].completed;
      this.$emit('change-complete', id)
    },
    removeTodo(id) {
     console.log(id)
      this.$emit('remove-todo', id)
    }
  }
}
</script>

<style scoped>
  ul {
    margin: 30px auto;
    padding: 0;
    width: 90%;
    list-style: none;
  }

  @media (min-width: 960px) {
    ul {
      width: 40%;
    }
  }

</style>