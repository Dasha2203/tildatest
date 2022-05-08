<template>
  <div class="tab-navigation">
    <div
        :class="`tab-navigation__item ${active === item ? 'tab-navigation__item-active' : ''}`"
        v-for="item in tabItems"
        :key="item"
        @click="$emit('changeTab', item)"
    >
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  name: "TabNavigation",
  props: ['tabItems', 'active']
}
</script>

<style scoped>

</style>