<template>
  <div class="projects-wrap">
    <div class="projects-wrap__header">
      <div class="projects-wrap__title">
        {{ type.title }}:
      </div>
      <div class="btn-with-icon" @click="openCreateProjectModal = true">
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

    <!--    Modal to create project-->
    <Modal
        v-if="openCreateProjectModal"
        @closeModal="closeModal"
    >
      <template v-slot:header>
        <div class="modal__title">
          Введите название сайта
        </div>
      </template>
      <template v-slot:body>
        <Input
            :title="newTitle"
            :autofocus="true"
            :error="inputError"
            @changeInput="handleChangeTitle"
        />
        <button
            type="button"
            class="button button-orange"
            @click="() => handleAddProject(type.type)"
        >
          Создать
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>
import CardProject from "@/components/Project/CardProject";
import {mapActions, mapGetters} from "vuex";
import Modal from "@/components/global/Modal";
import Input from "@/components/global/Input";

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
      openCreateProjectModal: false,
      inputError: '',
      newTitle: `${this.type.title}`

    }
  },
  computed: {
    ...mapGetters(['getAllProjects', 'getTypeProjects'])
  },
  components: {Input, Modal, CardProject},
  methods: {
    ...mapActions(['addNewProject']),
    ...mapGetters({methodGetTypeProjects: "getTypeProjects"}),
    handleChangeTitle(event) {
      this.newTitle = event.target.value;
    },
    handleAddProject(typeId) {
      if (this.newTitle.trim()) {
        this.addNewProject({
          title: this.newTitle,
          type: typeId
        });
        this.closeModal();
      } else {
        this.inputError = 'Введите название сайта'
      }
    },
    closeModal() {
      this.inputError = '';
      this.newTitle = `${this.type.title} ${this.getTypeProjects(this.type.type).length + 1}`
      this.openCreateProjectModal = false
    }
  },
  mounted() {
    this.newTitle = `${this.type.title} ${this.getTypeProjects(this.type.type).length + 1}`
  }

}
</script>