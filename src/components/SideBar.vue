<template>
  <div
      :class="`sidebar ${active ? 'sidebar-active' : ''}`"
      @click.self="$emit('close')"
  >

  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    active: {
      type: Boolean
    }
  }
}
</script>

<style scoped>

</style>