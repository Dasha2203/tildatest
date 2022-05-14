<template>
  <div class="page settings-page" v-if="page">
    <div class="page__header">
      <div class="container">
        <h1>{{ page.title }}</h1>
      </div>
    </div>
    <div class="settings-page__body" v-if="!!getBlocks.length">
      <template
          v-for="(block, idx) in pageBlocks"
          :key="block.id"
      >
        <HiddenBlock
            v-if="block.hide"
            :content="block"
            :idx="idx"
            :lastIdx="pageBlocks.length - 1"
            :idPage="idPage"
        />
        <BlockText
            v-else-if="block.type === getBlocks[0].id"
            :content="block"
            :idx="idx"
            :lastIdx="pageBlocks.length - 1"
            :idPage="idPage"
        />
        <BgBlockText
            v-else
            :content="block"
            :idx="idx"
            :lastIdx="pageBlocks.length - 1"
            :idPage="idPage"
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
        @addBlock="setOpenCreateBlockModal"
    />

    <!--    Modal create block-->
    <Modal
        v-if="openCreateBlockModal"
        @closeModal="closeModal"
    >
      <template v-slot:header>
        <div class="modal__title">
          Заполните поля блока
        </div>
      </template>
      <template v-slot:body>
        <Input
            :title="newBlock.title"
            :autofocus="true"
            :error="newBlock.errorTitle"
            :name="'title'"
            @changeInput="handleChangeInputBlock"
        />
        <TextArea
            :title="newBlock.description"
            :placeholder="'Текст блока'"
            @changeInput="handleChangeInputBlock"
            :name="'description'"
        />
        <button
            type="button"
            class="button button-orange"
            @click="addBlock"
        >
          Сохранить
        </button>
      </template>
    </Modal>

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
import TextArea from "@/components/global/TextArea";
import HiddenBlock from "@/components/ProgectSettings/HiddenBlock";

export default {
  name: "ProjectSettings",
  components: {HiddenBlock, TextArea, Input, TabNavigation, Modal, BlockText, SideBar, BgBlockText},
  data() {
    return {
      openCreateBlockModal: false,
      selectBlock: null,
      allImages: [],
      openSideBar: false,
      openSettingsPageModal: false,
      newBlock: {
        title: 'Title block',
        description: '',
        errorTitle: ''
      },
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
    ...mapGetters('libraryBlocks',["getBlocks"]),
    ...mapGetters('page', ['getPageById', 'getBlocksPage', 'getOpenSettingsModal']),
    page() {
      return this.getPageById(this.idPage);
    },
    pageBlocks() {
      return this.getBlocksPage;
    },
    idPage() {
      this.setSelectPage({id: +routers.currentRoute.value.params.id})
      return +routers.currentRoute.value.params.id
    },
  },

  watch: {
    page: function () {
      if (this.page) {
        this.selectPage = {
          name: this.page.title,
          description: this.page.description || '',
          link: this.page.link,
          errorName: '',
          errorPath: '',
          path: this.page.path || this.page.id
        }
      }
    }
  },

  methods: {
    ...mapActions('page', [
      "addBlockToPage",
      'setSettingsPage',
      'setImgPage',
      'changeOpenPageSettings',
      'setSelectPage'
    ]),
    ...mapGetters('libraryBlocks', ['getCategoryBlocks']),
    setOpenCreateBlockModal(block) {
      this.selectBlock = block;
      this.openCreateBlockModal = true;
    },
    addBlock() {

      let payloadBlock = {
        idBlock: this.selectBlock.id,
        idPage: this.idPage,
        title: this.newBlock.title,
        description: this.newBlock.description
      }

      if (this.newBlock.title) {
        this.addBlockToPage(payloadBlock);
        this.openCreateBlockModal = false;
        this.openSideBar = false;
        this.newBlock = {
          title: 'Title block',
          description: '',
          errorTitle: ''
        }
      } else {
        this.newBlock.errorTitle = 'Введите заголовок'
      }
    },
    handleChangeInputBlock(event) {
      this.newBlock[event.target.name] = event.target.value
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
      this.openCreateBlockModal = false;
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
    window.scrollTo(0, 0)
    let pageData = this.getPageById(this.idPage);
    let data = require('@/data/images.json');

    this.selectPage = {
      name: pageData.title,
      description: pageData.description || '',
      link: pageData.link,
      errorName: '',
      errorPath: '',
      path: pageData.path || pageData.id
    }

    this.allImages = data;
    this.activeImg = data[0].src

  }
}
</script>