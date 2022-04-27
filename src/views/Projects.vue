<template>
  <div class="page projects">
    <div class="container">
      <ProjectWrap v-for="projectType in getTypeProjects" :type="projectType"/>
    </div>
  </div>
</template>

<script>
import CardProject from "@/components/CardProject";
import ProjectWrap from "@/components/Projects/ProjectWrap";
import { mapState, mapGetters } from 'vuex'

export default {
  name: "Projects",
  components: {
    ProjectWrap,
    CardProject
  },
  mounted() {
    this.$store.dispatch('fetchAllProjects')
  },
  computed: mapGetters(['getTypeProjects']),


}
</script>