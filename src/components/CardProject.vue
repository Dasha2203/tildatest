<template>
  <div class="card-project">
    <router-link class="card-project__link" :to="project.link">
      <div class="card-project__header">
        <div class="card-project__title">
          {{ project.title }}
        </div>
      </div>

    </router-link>
    <div class="card-project__footer">Редактировать сайт</div>
  </div>
</template>

<script>
export default {
  name: "CardProject",
  props: {
    project: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>

</style>