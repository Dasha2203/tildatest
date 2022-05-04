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
  import ProjectWrap from "@/components/Projects/ProjectWrap";
  import { mapGetters } from 'vuex';

  export default {
    name: "Projects",
    components: {
      ProjectWrap
    },
    computed: mapGetters(['getProjectsTypes']),

  }
</script>