<template>
  <div class="card-project">
    <div class="card-project__options" @click.stop="openOptions">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px"
           viewBox="0 0 24 24" version="1.1"><title>Artboard</title>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Artboard" fill="#000000" fill-rule="nonzero">
            <path
                d="M11.75,18 C12.7164983,18 13.5,18.7835017 13.5,19.75 C13.5,20.7164983 12.7164983,21.5 11.75,21.5 C10.7835017,21.5 10,20.7164983 10,19.75 C10,18.7835017 10.7835017,18 11.75,18 Z M11.75,10.5 C12.7164983,10.5 13.5,11.2835017 13.5,12.25 C13.5,13.2164983 12.7164983,14 11.75,14 C10.7835017,14 10,13.2164983 10,12.25 C10,11.2835017 10.7835017,10.5 11.75,10.5 Z M11.75,3 C12.7164983,3 13.5,3.78350169 13.5,4.75 C13.5,5.71649831 12.7164983,6.5 11.75,6.5 C10.7835017,6.5 10,5.71649831 10,4.75 C10,3.78350169 10.7835017,3 11.75,3 Z"
                id="Shape"/>
          </g>
        </g>
      </svg>
      <Options
          :title="'Настройки сайта'"
          @removeproject="removeProjectById"
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
  </div>
</template>

<script>
import Options from "@/components/Options";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CardProject",
  components: {
    Options
  },
  computed: {
    ...mapGetters(['getOpenProjectOptions'])
  },
  methods: {
    ...mapActions(['removeProject', 'changeOpenProjectOptions']),
    removeProjectById() {
      this.removeProject({id: this.project.id})
    },
    openOptions() {
      this.changeOpenProjectOptions({id: this.project.id})
    }
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
}
</script>
