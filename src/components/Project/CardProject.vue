<template>
  <div class="card-project">
    <div class="card-project__options" @click.stop="openOptions">
      <svg>
        <use xlink:href="#options"></use>
      </svg>
      <DropDown
          :title="'Настройки сайта'"
          :listData="listOptions"
          v-if="!!getOpenProjectOptions && getOpenProjectOptions === project.id"
      />
    </div>
    <router-link class="card-project__link" :to="project.link">
      <div class="card-project__header">
        <div class="card-project__title">
          {{ project.title }}
        </div>
      </div>
    </router-link>
    <div class="card-project__footer">
      <div class="btn-with-icon">
        <div class="icon light">
          <svg width="14px" height="14px" style="display:block; width:14px;" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 28.21 28">
            <g>
              <rect style="fill:#f78369;" x="20.41" y="2.17" width="7.63" height="3.63"
                    transform="translate(9.91 -15.97) rotate(45)"></rect>
              <rect style="fill:#f78369;" x="11.41" y="3.89" width="7.63" height="18.18"
                    transform="translate(13.64 -6.97) rotate(45)"></rect>
              <polygon style="fill:#f78369;" points="0 28 4.45 18.36 9.85 23.76 0 28"></polygon>
            </g>
          </svg>
        </div>
        <span class="btn-with-icon__text">
          РЕДАКТИРОВАТЬ САЙТ
        </span>
      </div>
      <div class="btn-with-icon link-project">
        <div class="icon light">
          <svg width="14px" height="14px" style="display:block; width:14px;" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 26.14 26.14">
            <g>
              <polygon style="fill:#f68269;"
                       points="20.14 23.14 3 23.14 3 6 12.57 6 12.57 3 0 3 0 26.14 23.14 26.14 23.14 13.57 20.14 13.57 20.14 23.14"></polygon>
              <polygon style="fill:#f68269;"
                       points="16.14 0 16.14 3 21.02 3 7.24 16.78 9.36 18.9 23.14 5.12 23.14 10 26.14 10 26.14 0 16.14 0"></polygon>
            </g>
          </svg>
        </div>
        <span class="btn-with-icon__text ">
          https://vk.com
        </span>
      </div>
    </div>

    <!--    Modal change title project-->
    <Modal
        v-if="openChangeNameModal"
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
            @click="saveNewTitleProject"
        >
          Сохранить
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

import DropDown from "@/components/Project/DropDown";
import Modal from "@/components/global/Modal";
import Input from "@/components/global/Input";

export default {
  name: "CardProject",
  components: {
    Input,
    Modal,
    DropDown
  },
  props: {
    project: {
      type: Object,
      required: true
    },
    indexProject: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      openChangeNameModal: false,
      inputError: '',
      newTitle: this.project.title,

    }
  },
  computed: {
    ...mapGetters(['getOpenProjectOptions']),
    listOptions() {
      let that = this;
      return [
        {
          name: 'Переименовать',
          action() {
            that.openChangeNameModal = true
          }
        },
        {
          name: 'Удалить',
          action() {
            that.removeProjectById()
          }
        }
      ]
    }
  },
  methods: {
    ...mapActions(['removeProject', 'changeOpenProjectOptions', 'changeNameProject']),
    removeProjectById() {
      this.removeProject({id: this.project.id})
    },
    openOptions() {
      this.changeOpenProjectOptions({id: this.project.id})
    },
    saveNewTitleProject() {

      if (this.newTitle.trim()) {
        this.changeNameProject({id: this.project.id, newName: this.newTitle})
        this.openChangeNameModal = false;
      } else {
        this.inputError = 'Введите название сайта'
      }
    },
    handleChangeTitle(event) {
      this.newTitle = event.target.value;
    },
    closeModal() {
      this.inputError = '';
      this.newTitle = this.project.title;
      this.openChangeNameModal = false
    }
  },

}
</script>
