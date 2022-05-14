<template>
  <div class="preview" v-if="getBlocks.length">
    <template
        v-for="block in pageBlocks"
        :key="block.id"
    >
      <BlockText
          v-if="block.type === getBlocks[0].id && !block.hide"
          :content="block"
      />
      <BgBlockText
          v-else-if="!block.hide"
          :content="block"
      />
    </template>
    <router-link class="button" :to="`/project/settings/page/${$route.params.id}`">
      Вернуться к редактирвоанию
    </router-link>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

import BgBlockText from "@/components/ProgectSettings/BgBlockText";
import BlockText from "@/components/ProgectSettings/BlockText";
import routers from "@/routers";

export default {
  name: "PreviewPage",
  components: {BlockText, BgBlockText},
  methods: {
    ...mapActions('page', ['setSelectPage'])
  },
  computed: {
      ...mapGetters('page', ['getBlocksPage']),
    ...mapGetters('libraryBlocks', ['getBlocks']),

    pageBlocks() {
      return this.getBlocksPage;
    },
    idPage() {
      this.setSelectPage({ id: +routers.currentRoute.value.params.id})
      return +routers.currentRoute.value.params.id
    },
  },
  watch: {
    idPage() {
      this.setSelectPage({ id: this.idPage})
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  }
}
</script>