<template>
  <div class="page">
    <h1>Todo app</h1>
    <AddTodo @add-todo="addTodo"/>
    <TodoList
        :todos="todos"
        @add-todo="addTodo"
        @change-complete="changeTodoCompleted"
        @remove-todo="removeTodo"
    />
  </div>
</template>

<script>
import TodoList from "@/components/Todo/TodoList";
import AddTodo from "@/components/Todo/AddTodo";

export default {
  name: "Todos.vue",
  components: {
    TodoList,
    AddTodo
  },
  mounted() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=100')
        .then(response => response.json())
        .then(json => {
          setTimeout(() => {
            this.todos = json
            this.loading = false
          }, 1000)

        })
  },
  methods: {
    changeTodoCompleted(id) {
      console.log('change', id)
      let i = this.todos.findIndex(t => t.id === id);
      this.todos[i].completed = !this.todos[i].completed;
    },
    addTodo(todo) {
      console.log(todo)
      this.todos.push(todo)
    },
    removeTodo(id) {
      console.log(id)
      console.log(this.todos[0])
      this.todos = this.todos.filter(t => t.id !== id)
    }
  },
  data() {
    return {
      todos: []
    }
  }
}
</script>

<style scoped>

</style>