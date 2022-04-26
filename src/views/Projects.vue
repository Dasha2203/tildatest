<template>
  <div class="page">
    <div class="container">
      <h1 @click="getStore">My Projects</h1>
      <div class="wrap">
        <CardProject
            v-for="project in projectsComp"
            :project="project"
            v-bind:key="project.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardProject from "@/components/CardProject";

export default {
  name: "Projects",
  components: {
    CardProject
  },
  methods: {
    getStore() {
      // let l = this.$store.getters.getProjects()
      console.log(this.$store.getters.getProjects)
      return this.$store.getters.getProjects
    }

  },
  data() {
    return {
      projects: this.getStore
    }
  },
  computed: {
    projectsComp() {
      return this.$store.getters.getProjects
    }
  }

}
</script>

<style scoped>
.wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>