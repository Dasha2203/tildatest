<template>
  <li>
    <span v-bind:class="{done: todo.completed}">
      <input
          type="checkbox"
          :checked="todo.completed"
          v-on:change="$emit('change-complete', todo.id)"
      />
      <strong>{{ todo.id }}</strong>
      {{ todo.title }}
    </span>
    <button
        class="btn"
        v-on:click="$emit('remove-todo', todo.id)"
    >
      &times;
    </button>
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: Number
  },
  methods: {
    markComplete() {
      console.log(this.todo.completed)
      // this.todo.completed = false
    }
  }
}
</script>

<style scoped>
  li {
    padding: 10px 20px;
    display: flex;
    justify-content: flex-start;
    border: 1px solid #ccc;
    margin-bottom: 10px;
  }

  .btn {
    background-color: red;
    color: #fff;
    border: none;
    border-radius: 3px;
    display: block;
    margin-left: auto;
    cursor: pointer;
  }

  .done {
    text-decoration: line-through;
  }
</style>