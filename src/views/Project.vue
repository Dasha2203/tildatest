<template>
  <div class="page project-page">
    <div class="project-page__header">
      <div class="container">
        <div class="project-page__buttons">
          <div class="left">
            <div class="btn-with-icon" @click="openModal = 'domain'">
              <div class="icon light">
                <svg>
                  <use xlink:href="#domain"></use>
                </svg>
              </div>
              <span class="btn-with-icon__text">
                Подключить домен
              </span>
            </div>
            <div class="btn-with-icon">
              <div class="icon light">
                <svg>
                  <use xlink:href="#publish"></use>
                </svg>
              </div>
              <span class="btn-with-icon__text">
                Опубликовать все страницы
              </span>
            </div>

            <div class="btn-with-icon">
              <div class="icon light">
                <svg>
                  <use xlink:href="#requests"/>
                </svg>
              </div>
              <span class="btn-with-icon__text">
                Заявки
              </span>
            </div>
          </div>
          <div class="right">
            <div class="btn-with-icon">
              <div class="icon light">
                <svg>
                  <use xlink:href="#link"/>
                </svg>
              </div>
              <span class="btn-with-icon__text">
                Заявки
              </span>
              https://project_{{+$route.params.id}}
            </div>
          </div>
        </div>
        <div class="project-page__panel">
          <div class="project__title">
            {{ getProjectById(+$route.params.id).title }}
          </div>
          <div class="buttons">
            <button
                class="button-orange button"
                type="button"
                @click="openModal = 'create'"
            >
              <div class="icon">
                <svg class="icon">
                  <use xlink:href="#plus"></use>
                </svg>
              </div>
              Создать страницу
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="list-pages">
        <div v-if="getPagesByIdProject(+$route.params.id).length" class="list-pages__title">Страницы сайта:</div>
        <div v-else class="list-pages__title">Нет страниц</div>
        <ListPageItem
            v-for="page in getPagesByIdProject(+$route.params.id)"
            :page="page"
            :key="page.id"
            @remove="removeSelectPage"
        />
      </div>
    </div>

    <!--    Modal to create page-->
    <Modal
        v-if="openModal === 'create'"
        @closeModal="closeModal"
    >
      <div class="modal__title">
        Введите название страницы
      </div>
      <Input
          :title="newTitle"
          :autofocus="true"
          :error="inputError"
          @changeInput="handleChangeTitle"
      />
      <button
          type="button"
          class="button button-orange"
          @click="handleAddPage"
      >
        Создать
      </button>
    </Modal>

    <!--    Modal domain page-->
    <Modal
        v-if="openModal === 'domain'"
        @closeModal="closeModal"
    >
      <template v-slot:header>
        <div class="modal__title">
          Введите имя домена
        </div>
      </template>
      <template v-slot:body>
        <Input
            :title="domain"
            :autofocus="true"
            :error="inputError"
            @changeTitle="handleChangeDomain"
        />
        <button
            type="button"
            class="button button-orange"
            @click="checkDomain"
        >
          Сохранить
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import routers from "@/routers";
import ListPageItem from "@/components/Project/ListPageItem";
import Modal from "@/components/Modal";
import Input from "@/components/Input";

export default {
  name: "Project",
  components: {
    Input,
    Modal,
    ListPageItem
  },
  data() {
    return {
      idProject: +routers.currentRoute.value.params.id,
      openModal: false,
      openDomainModal: false,
      inputError: '',
      newTitle: ``,
      domain: ''
    }
  },
  computed: {
    ...mapGetters(['getPagesByIdProject', 'getProjectById'])
  },
  methods: {
    ...mapActions(['addNewPageToProject', 'removePage']),
    closeModal() {
      this.inputError = '';
      this.domain = '';
      this.newTitle = `Page ${this.getPagesByIdProject(+routers.currentRoute.value.params.id).length + 1}`;
      this.openModal = false
    },
    handleChangeTitle(value) {
      this.newTitle = value;
    },
    handleChangeDomain(value) {
      this.domain = value;
    },
    handleAddPage() {
      if (this.newTitle.trim()) {
        this.addNewPageToProject({
          id: +routers.currentRoute.value.params.id,
          newName: this.newTitle
        })
        this.closeModal();
      } else {
        this.inputError = 'Введите название страницы'
      }
    },
    removeSelectPage(idPage) {
      this.removePage({idPage, idProject: this.getProjectById(+routers.currentRoute.value.params.id).id})
    },
    checkDomain() {
      let regularExpression = /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;
      if (this.domain.match(regularExpression)) {
        this.closeModal()
      } else if (!this.domain.trim()) {
        this.inputError = 'Введите домен';
      } else {
        this.inputError = 'Невалидный домен';
      }
    },

  },
  mounted() {
    this.newTitle = `Page ${this.getPagesByIdProject(+routers.currentRoute.value.params.id).length + 1}`
  },
}
</script>