<template>
  <div class="page settings-page" v-if="page">
    <div class="page__header">
      <div class="container">
        <h1>{{ page.title }}</h1>
      </div>
    </div>
    <div class="settings-page__body" v-if="!!getBlocks.length">
      <template
          v-for="block in pageBlocks"
          :key="block.id"
      >
        <BlockText
            v-if="block.type === getBlocks[0].id"
            :content="block"
        />
        <BgBlockText
            v-else
            :content="block"
        />
      </template>
      <div class="container">
        <button
            type="button"
            class="button button-orange"
            @click="openSideBar = true"
        >
          Добавить запись
        </button>
      </div>

    </div>

    <SideBar
        :active="openSideBar"
        @close="openSideBar = false"
        @addBlock="addBlock"
    />

    <Modal
        v-if="getOpenSettingsModal"
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
                :title="`https://${$route.fullPath}/`"
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
        <router-link class="navigation-link" :to="`/project/settings/page/${idPage}`">
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
import {mapActions, mapGetters} from "vuex";

import routers from "@/routers";
import SideBar from "@/components/ProgectSettings/SideBar";
import BlockText from "@/components/ProgectSettings/BlockText";
import BgBlockText from "@/components/ProgectSettings/BgBlockText";
import Modal from "@/components/global/Modal";
import TabNavigation from "@/components/global/TabNavigation";
import Input from "@/components/global/Input";

export default {
  name: "ProjectSettings",
  components: {Input, TabNavigation, Modal, BlockText, SideBar, BgBlockText},
  data() {
    return {
      allImages: [],
      openSideBar: false,
      openSettingsPageModal: false,
      idPage: +routers.currentRoute.value.params.id,
      selectPage: {
        name: '',
        description: '',
        link: '',
        errorName: '',
        errorPath: '',
        path: ''
      },
      settingsTabs: ['Главное', 'Бейджик'],
      activeSettingsTab: 'Главное',
      activeImg: '',
    }
  },
  computed: {
    ...mapGetters(['getPageById', 'getBlocksPage', "getBlocks", 'getOpenSettingsModal']),
    page() {
      return this.getPageById(this.idPage);
    },
    pageBlocks() {
      return this.getBlocksPage(this.idPage);
    },
  },

  watch: {
    page: function () {
      this.selectPage = {
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
    ...mapActions([
      "getCategory",
      "addBlockToPage",
      'setSettingsPage',
      'setImgPage',
      'changeOpenPageSettings',
      'removeSelectBlock',
      'moveSelectBlock',
      "duplicateSelectBlock"
    ]),
    ...mapGetters(['getCategoryBlocks']),
    addBlock(block) {
      let title = 'Title Block';
      let description = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
      the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
      scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
      typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
      Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

      let payloadBlock = {
        idBlock: block.id,
        idPage: this.idPage,
        title,
        description
      }

      this.addBlockToPage(payloadBlock);
      this.openSideBar = false;
    },

    handleChangeInput(event) {
      this.selectPage[event.target.name] = event.target.value
    },

    handleSelectSetting(tab) {
      this.activeSettingsTab = tab;
    },

    closeModal() {
      this.selectPage.name = this.page.title;
      this.selectPage.description = this.page.description;
      this.selectPage.path = this.page.path || this.page.id;

      this.selectPage.errorName = '';
      this.selectPage.errorPath = '';
      this.changeOpenPageSettings({open: false})
    },

    saveSettings() {
      if (this.selectPage.name && this.selectPage.path) {
        this.setSettingsPage({
          id: this.page.id,
          title: this.selectPage.name,
          description: this.selectPage.description,
          path: this.selectPage.path
        })

        this.closeModal();
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
      this.changeOpenPageSettings({open: false})
    }
  },
  mounted() {
    this.getCategory();
    let pageData = this.getPageById(this.idPage);
    this.selectPage = {
      name: pageData.title,
      description: pageData.description || '',
      link: pageData.link,
      errorName: '',
      errorPath: '',
      path: pageData.path || pageData.id
    }
    let data = require('@/data/images.json');
    this.allImages = data;
    this.activeImg = data[0].src

  }
}
</script>