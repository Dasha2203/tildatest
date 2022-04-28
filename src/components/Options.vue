<template>
  <div class="options__list">
    <div class="options__title">{{ title }}</div>
    <div
        class="options__item"
        v-on:click="$emit('removeproject')"
    >
      Удалить
    </div>
  </div>
</template>

<script>
export default {
  name: "Options",
  props: ['title']
}
</script>