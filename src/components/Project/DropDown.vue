<template>
  <div class="options__list">
    <div class="options__title">{{ title }}</div>
    <div
        v-for="(item, idx) in listData"
        :key="idx"
        class="options__item"
        @click="item.action"
    >
      {{item.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: "DropDown",
  props: ['title', 'listData']
}
</script>