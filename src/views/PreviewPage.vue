<template>
  <div class="preview" v-if="!!getBlocks.length">
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
    <router-link class="button" :to="`/project/settings/page/${$route.params.id}`">
      Вернуться к редактирвоанию
    </router-link>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

import BgBlockText from "@/components/ProgectSettings/BgBlockText";
import BlockText from "@/components/ProgectSettings/BlockText";
import routers from "@/routers";

export default {
  name: "PreviewPage",
  components: {BlockText, BgBlockText},
  data() {
    return {
      pageBlocks: []
    }
  },
  methods: {
    ...mapGetters(['getBlocksPage'])
  },
  computed: {
      ...mapGetters(['getPageById', "getBlocks", 'getOpenSettingsModal']),

    // pageBlocks() {
    //   return this.getBlocksPage(+routers.currentRoute.value.params.id);
    // },
  },

  mounted() {
    console.log(+routers.currentRoute.value.params.id)
    this.getBlc
    this.pageBlocks = this.getBlocksPage(+routers.currentRoute.value.params.id);
  }
}
</script>