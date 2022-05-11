<template>
  <div class="page settings-page">
    <div class="page__header">
      <div class="container">
        <h1>{{page.title}}</h1>
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
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

import routers from "@/routers";
import SideBar from "@/components/ProgectSettings/SideBar";
import BlockText from "@/components/ProgectSettings/BlockText";
import BgBlockText from "@/components/ProgectSettings/BgBlockText";

export default {
  name: "ProjectSettings",
  components: {BlockText, SideBar, BgBlockText },
  data() {
    return {
      openSideBar: false,
      idPage: +routers.currentRoute.value.params.id,
    }
  },
  computed: {
    ...mapGetters(['getPageById', 'getBlocksPage', "getBlocks"]),
    page() {
      return this.getPageById(this.idPage);
    },
    pageBlocks() {
      return this.getBlocksPage(this.idPage);
    },
  },

  methods: {
    ...mapActions(["getCategory","addBlockToPage", ]),
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
    }
  },
  mounted() {
    this.getCategory();
  }
}
</script>