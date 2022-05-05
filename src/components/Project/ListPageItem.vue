<template>
  <div class="list-page__item">
    <div class="list-page__img">
      <img :src="require('@/assets/images/page-img.jpeg')" alt="page image">
    </div>
    <div class="list-page__title">
      {{page.title}}
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
      <template  v-slot:header>
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
              :error="''"
          />
          <Input
              :title="selectPage.description"
              :autofocus="true"
              :error="''"
          />
          <Input
              :title="selectPage.link"
              :autofocus="true"
              :error="''"
          />
        </div>
        <div v-show="activeSettingsTab === settingsTabs[1]">
          Бейджик
        </div>

      </template>

      <template v-slot:footer>
        <router-link class="navigation-link" :to="`/project/settings/page/${page.id}`">Перейти в настройки сайта</router-link>
        <div class="buttons">
          <button
              type="button"
              class="button button-border"
              @click="this.openSettingsPageModal=false"
          >
            Закрыть
          </button>
          <button
              type="button"
              class="button button-orange"
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
      settingsTabs: ['Главное','Бейджик'],
      activeSettingsTab: 'Главное',
      selectPage: {
        name: this.page.title,
        description: this.page.description || '',
        link: this.page.link
      }
    }
  },
  methods: {
    handleSelectSetting(tab) {
      this.activeSettingsTab = tab;
    }
  }
}
</script>