<template>
  <div :class="`text-block-bg ${preview ? 'preview' : ''}`" :style="bgImage">
    <ControlBlock
        v-if="!preview"
        :block="content"
        :idx="idx"
        :lastIdx="lastIdx"
        @editBlock="openEditBlockModal = true"
    />
    <div class="container">
      <div
          class="text-block-bg__title"
          v-if="content.title"
      >
        {{ content.title }}
      </div>
      <div
          v-if="content.description"
          class="text-block-bg__description"
      >
        {{ content.description }}
      </div>
    </div>

    <!--    Modal edit block-->
    <Modal
        v-if="openEditBlockModal"
        @closeModal="closeModal"
    >
      <template v-slot:header>
        <div class="modal__title">
          Заполните поля блока
        </div>
      </template>
      <template v-slot:body>
        <Input
            :title="contentBlock.title"
            :autofocus="true"
            :error="contentBlock.errorTitle"
            :name="'title'"
            @changeInput="handleChangeInputBlock"
        />
        <TextArea
            :title="contentBlock.description"
            :placeholder="'Текст блока'"
            @changeInput="handleChangeInputBlock"
            :name="'description'"
        />
        <button
            type="button"
            class="button button-orange"
            @click="editBlock"
        >
          Сохранить
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>
import {mapActions} from "vuex";

import routers from "@/routers";

import ControlBlock from "@/components/ProgectSettings/ControlBlock";
import Modal from "@/components/global/Modal";
import Input from "@/components/global/Input";
import TextArea from "@/components/global/TextArea";

export default {
  name: "BgBlockText",
  components: {TextArea, Input, Modal, ControlBlock},
  props: ['content', 'idx', 'lastIdx', 'idPage'],
  data() {
    return {
      openEditBlockModal: false,
      contentBlock: {
        title: this.content.title,
        description: this.content.description,
        errorTitle: ''
      },
    }
  },
  computed: {
    bgImage() {
      return `background-image: url(${require('@/assets/images/pages/3.jpeg')})`
    },
    preview() {
      return +routers.currentRoute.value.fullPath.includes('preview')
    }
  },
  methods: {
    ...mapActions(['editBlockPage']),
    editBlock() {
      let payloadBlock = {
        idBlock: this.content.id,
        idPage: this.idPage,
        title: this.contentBlock.title,
        description: this.contentBlock.description
      }

      if (this.contentBlock.title) {
        this.editBlockPage(payloadBlock);
        this.openEditBlockModal = false;
      } else {
        this.contentBlock.errorTitle = 'Введите заголовок'
      }
    },

    closeModal() {
      this.contentBlock = {
        title: this.content.title,
        description: this.content.description,
        errorTitle: ''
      };
      this.openEditBlockModal = false;
    },

    handleChangeInputBlock(event) {
      this.contentBlock[event.target.name] = event.target.value
    },
  }

}
</script>