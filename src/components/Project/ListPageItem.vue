<template>
  <div class="list-page__item">
    <router-link class="navigation-link" :to="`/project/settings/page/${page.id}`">
      <div class="list-page__img">
        <img
            :src="page.srcImg || require('@/assets/images/pages/page-img.jpeg')"
            alt="page image">
      </div>
    </router-link>
    <router-link class="navigation-link" :to="`/project/settings/page/${page.id}`">
      <div class="list-page__title">
        {{ page.title }}
      </div>
    </router-link>
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
        @closeModal="closeModal"
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
          <div class="row">
            <Input
                :title="`http://${$route.fullPath}/`"
                :autofocus="true"
                :error="''"
                :label="'Адрес страницы'"
                :disabled="true"
            />
            <Input
                :title="selectPage.path"
                :autofocus="true"
                :error="selectPage.errorPath"
                :label="''"
                :name="'path'"
                @changeInput="handleChangeInput"
            />
          </div>
        </div>
        <div v-show="activeSettingsTab === settingsTabs[1]">
          <div class="subtitle">Текущее изображение бейджика</div>
          <div class="paragraph">
            По умолчанию для бейджика используется первая картинка. Вы можете выбрать из предоставленных ниже.
          </div>
          <div class="wrap-images">
            <div
                :class="`img__item ${activeImg === img.src ? 'img__item-active' : ''}`"
                v-for="img in allImages"
                :key="img.id"
                @click="activeImg = img.src"
            >
              <img :src="img.src" alt=""/>
            </div>

          </div>

          <div class="img">
            <img :src="activeImg" alt="">
          </div>
        </div>

      </template>

      <template v-slot:footer>
        <router-link class="navigation-link" :to="`/project/settings/page/${page.id}`">
          Перейти в настройки сайта
        </router-link>
        <div class="buttons">
          <button
              type="button"
              class="button button-border"
              @click="closeModal"
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
import {mapActions} from "vuex";

import TabNavigation from "@/components/global/TabNavigation";
import Modal from "@/components/global/Modal";
import Input from "@/components/global/Input";

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
      allImages: [],
      openSettingsPageModal: false,
      settingsTabs: ['Главное', 'Бейджик'],
      activeSettingsTab: 'Главное',
      activeImg: '',
      selectPage: {
        name: this.page.title,
        description: this.page.description || '',
        link: this.page.link,
        errorName: '',
        errorPath: '',
        path: this.page.path || this.page.id
      }
    }
  },
  methods: {
    ...mapActions(['setSettingsPage', 'setImgPage']),
    handleSelectSetting(tab) {
      this.activeSettingsTab = tab;
    },

    handleChangeInput(event) {
      this.selectPage[event.target.name] = event.target.value
    },

    closeModal() {
      this.selectPage.name = this.page.title;
      this.selectPage.description = this.page.description;
      this.selectPage.path = this.page.path || this.page.id;
      this.openSettingsPageModal = false;
      this.selectPage.errorName = '';
      this.selectPage.errorPath = '';
    },

    saveSettings() {
      if (this.selectPage.name && this.selectPage.path) {
        this.setSettingsPage({
          id: this.page.id,
          title: this.selectPage.name,
          description: this.selectPage.description,
          path: this.selectPage.path
        })

        this.openSettingsPageModal = false;
        this.selectPage.errorName = '';
        this.selectPage.errorPath = '';
      } else if (!this.selectPage.name) {
        this.selectPage.errorName = 'Введите название страницы'
      } else {
        this.selectPage.errorPath = 'Введите адрес страницы'
      }
    },

    saveImg() {
      this.setImgPage({
        srcImg: this.activeImg,
        id: this.page.id
      })
      this.openSettingsPageModal = false;
    }
  },
  mounted() {
    let data = require('@/data/images.json');
    this.allImages = data;
    this.activeImg = data[0].src
  }
}
</script>