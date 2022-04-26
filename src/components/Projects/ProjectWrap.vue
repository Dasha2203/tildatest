<template>
  <div class="projects-wrap">
    <div class="projects-wrap__header">
      <div class="projects-wrap__title">
        {{ projectsData.title }}:
      </div>
      <div class="btn-with-icon" @click="add(projectsData.id)">
        <div class="icon">
          <svg width="15px" class="td-sites-uppanel__rightbtn-plus" style="display:block; width:15px;"
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
            <g>
              <polygon style="fill:#fff;"
                       points="26.79 13 17 13 17 3.21 13 3.21 13 13 3.21 13 3.21 17 13 17 13 26.79 17 26.79 17 17 26.79 17 26.79 13"></polygon>
            </g>
          </svg>
        </div>
        <span class="btn-with-icon__text">
          Создать новый сайт
        </span>
      </div>
    </div>
    <div class="projects-wrap__body">
      <div class="project-wrap__item"  v-for="project in projectsData.projects" v-bind:key="project.id + project.title">
        <CardProject :project="project"/>
      </div>
    </div>
  </div>
</template>

<script>
import CardProject from "@/components/CardProject";

export default {
  name: "ProjectWrap",
  props: {
    projectsData: {
      type: Object
    }
  },
  components: {CardProject},
  methods: {
    add(idWrap) {
      // this.$store.addProjects();
      this.$store.commit('addProjects', idWrap)
    }
  },
  computed: {}
}
</script>