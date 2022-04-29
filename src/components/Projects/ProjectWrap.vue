<template>
  <div class="projects-wrap">
    <div class="projects-wrap__header">
      <div class="projects-wrap__title">
        {{ type.title }}:
      </div>
      <div class="btn-with-icon" @click="handleAddProject(type.type, type.title)">
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
    <div class="projects-wrap__body" v-if="getTypeProjects(type.type).length">
      <div
          class="project-wrap__item"
          v-for="(project, idx) in getTypeProjects(type.type)"
          :key="project.id"
      >
        <CardProject
            :project="project"
            :indexProject="idx"
        />
      </div>
    </div>
    <div class="projects-wrap__body" v-else>
      У вас нет сайтов
    </div>
  </div>
</template>

<script>
import CardProject from "@/components/CardProject";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProjectWrap",
  props: {
    type: {
      type: Object
    }
  },
  data() {
    return {
      title: 'My project',
    }
  },
  computed: {
    ...mapGetters(['getAllProjects', 'getTypeProjects'])
  },
  components: {CardProject},
  methods: {
    ...mapActions(['addNewProject']),

    handleAddProject(typeId,typeTitle) {
      this.addNewProject({
          title: typeTitle,
          type: typeId
      });
    }
  }

}
</script>