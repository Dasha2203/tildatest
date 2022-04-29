<template>
  <div class="page projects">
    <div class="container">
      <ProjectWrap
          v-for="projectType in getProjectsTypes"
          :key="projectType.type"
          :type="projectType"
      />
    </div>
  </div>
</template>

<script>
  import CardProject from "@/components/CardProject";
  import ProjectWrap from "@/components/Projects/ProjectWrap";
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: "Projects",
    components: {
      ProjectWrap,
      CardProject
    },
    methods: mapActions(['fetchAllProjects']),
    computed: mapGetters(['getProjectsTypes', 'getAllProjects']),
    mounted() {
      document.cookie = "user=Dasha";
      this.fetchAllProjects();
    },
  }
</script>