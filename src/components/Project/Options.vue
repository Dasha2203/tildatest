<template>
  <div class="options__list">
    <div class="options__title">{{ title }}</div>
    <div
        class="options__item"
        @click="$emit('changeNameProject')"
    >
      Изменить название
    </div>
    <div
        class="options__item"
        @click="$emit('removeProject')"
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