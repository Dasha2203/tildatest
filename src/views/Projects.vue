<template>
  <div class="page projects">
    <div class="container">
        <ProjectWrap v-for="projectType in projectsComp" :projects-data="projectType"/>
    </div>
  </div>
</template>

<script>
import CardProject from "@/components/CardProject";
import ProjectWrap from "@/components/Projects/ProjectWrap";

export default {
  name: "Projects",
  components: {
    ProjectWrap,
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
      console.log('comp data', this.$store.getters.getProjects)
      return this.$store.getters.getProjects
    }
  }

}
</script>