<template>
  <div class="projects-wrap">
    <div class="projects-wrap__header">
      <div class="projects-wrap__title">
        {{ type.title }}:
      </div>
      <div class="btn-with-icon" >
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
      <div
          class="project-wrap__item"
          v-for="(project, idx) in getAllProjects"

          :key="idx"
      >
        <CardProject v-if="project && (project.type === type.type)" :project="project"/>
      </div>
    </div>
  </div>
</template>

<script>
import CardProject from "@/components/CardProject";
import {mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "ProjectWrap",
  props: {
    type: {
      type: Object
    }
  },
  data () {
    return {
      title: 'My project',
    }
  },
  computed: mapGetters(['getAllProjects']),
  components: { CardProject },
  methods: {
    ...mapMutations(['ADD_NEW_PROJECT']),

    handleAddProject(id) {
      this.ADD_NEW_PROJECT(id)
    }
  }

}
</script>