<template>
  <div class="list-page__item">
    <router-link class="navigation-link" :to="`/project/settings/page/${page.id}`">
      <div class="list-page__img">
        <img
            :src="page.srcImg ? page.srcImg : require('@/assets/images/page-img.jpeg')"
            alt="page image">
      </div>
    </router-link>
    <div class="list-page__title">
      {{ page.title }}
    </div>
    <div class="list-page__buttons">
      <button
          type="button"
          class="list-page__button"
          @click="this.openSettingsPageModal = true"
      >
        <svg>
          <use xlink:href="#settings"></use>
        </svg>
        Настройки
      </button>
      <button type="button" class="list-page__button" @click="$emit('remove', page.id)">
        <svg>
          <use xlink:href="#remove"></use>
        </svg>
        Удалить
      </button>
      <button type="button" class="list-page__button">
        <svg>
          <use xlink:href="#link"></use>
        </svg>
        Ссылка
      </button>

    </div>
    <div class="list-page__type">
      Home page
    </div>

    <Modal
        v-if="openSettingsPageModal"
        @closeModal="this.openSettingsPageModal = false"
    >
      <template v-slot:header>
        <div class="modal__title">
          Настройки страницы
        </div>
        <TabNavigation
            :tabItems="settingsTabs"
            :active="activeSettingsTab"
            @changeTab="handleSelectSetting"
        />
      </template>
      <template v-slot:body>
        <div v-show="activeSettingsTab === settingsTabs[0]">
          <Input
              :title="selectPage.name"
              :autofocus="true"
              :error="selectPage.errorName"
              :placeholder="'Название страницы'"
              :label="'Заголовок'"
              :name="'name'"
              @changeInput="handleChangeInput"
          />
          <Input
              :title="selectPage.description"
              :autofocus="true"
              :error="''"
              :placeholder="'Описание'"
              :label="'Описание'"
              :name="'description'"
              @changeInput="handleChangeInput"
          />
          <Input
              :title="getLinkPage(page.id)"
              :autofocus="true"
              :error="''"
              :label="'Адрес страницы'"
          />
        </div>
        <div v-show="activeSettingsTab === settingsTabs[1]">
          <div class="subtitle">Текущее изображение бейджика</div>
          <div class="paragraph">
            По умолчанию для бейджика используется первая картинка из папки assets. Вы можете загрузить ваше собственное
            изображение.
          </div>
          <label for="file-upload" class="custom-file-upload">
            Custom Upload
          </label>
          <input id="file-upload" class="custom-file-upload-input" accept="image/png, image/gif, image/jpeg"
                 @change="previewFiles" type="file"/>
          <div class="img">
            <img v-if="this.imgUrl"
                 :src="imgUrl"
                 alt="page image">
            <img
                v-else
                :src="page.srcImg ? page.srcImg : require('@/assets/images/page-img.jpeg')"
                alt="page image">
          </div>
        </div>

      </template>

      <template v-slot:footer>
        <router-link class="navigation-link" :to="`/project/settings/page/${page.id}`">Перейти в настройки сайта
        </router-link>
        <div class="buttons">
          <button
              type="button"
              class="button button-border"
              @click="this.openSettingsPageModal=false"
          >
            Закрыть
          </button>
          <button
              v-if="activeSettingsTab === settingsTabs[0]"
              type="button"
              class="button button-orange"
              @click="saveSettings"
          >
            Сохранить
          </button>
          <button
              v-if="activeSettingsTab === settingsTabs[1]"
              type="button"
              class="button button-orange"
              @click="saveImg"
          >
            Сохранить
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>

import Modal from "@/components/Modal";
import TabNavigation from "@/components/TabNavigation";
import Input from "@/components/Input";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ListPageItem",
  components: {Input, TabNavigation, Modal},
  props: {
    page: {
      type: Object
    }
  },
  data() {
    return {
      openSettingsPageModal: false,
      settingsTabs: ['Главное', 'Бейджик'],
      activeSettingsTab: 'Главное',
      imgUrl: '',
      selectPage: {
        name: this.page.title,
        description: this.page.description || '',
        link: this.page.link,
        errorName: ''
      }
    }
  },
  computed: mapGetters(['getLinkPage']),
  methods: {
    ...mapActions(['setSettingsPage', 'setImgPage']),
    handleSelectSetting(tab) {
      this.activeSettingsTab = tab;
    },

    handleChangeInput(event) {
      this.selectPage[event.target.name] = event.target.value
    },

    saveSettings() {
      if (this.selectPage.name) {
        this.setSettingsPage({
          id: this.page.id,
          title: this.selectPage.name,
          description: this.selectPage.description
        })

        this.openSettingsPageModal = false;
      } else {
        this.selectPage.errorName = 'Введите название страницы'
      }
    },
    previewFiles(event) {
      this.imgUrl = URL.createObjectURL(event.target.files[0])
    },
    saveImg() {
      this.setImgPage({srcImg: this.imgUrl, id: this.page.id,})
      this.openSettingsPageModal = false;
    }
  }
}
</script>