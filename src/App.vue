<template>
  <div @click="handleClick">
    <Header v-if="showHeader"/>
    <router-view/>
    <Symbols/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

import Header from "@/components/global/Header/Header";
import Symbols from "@/components/global/Symbols";
import routers from "@/routers";

export default {
  name: 'App',
  components: {
    Symbols,
    Header
  },
  computed: {
    ...mapGetters(['getOpenProjectOptions', 'getOpenSettingsModal']),
    showHeader() {
      return !+routers.currentRoute.value.fullPath.includes('preview')
    }
  },
  methods: {
    ...mapActions(['changeOpenProjectOptions', 'fetchAllProjects', 'changeOpenPageSettings']),
    handleClick() {
      if (this.getOpenProjectOptions) {
        this.changeOpenProjectOptions(null)
      }
    }
  },
  mounted() {
    this.fetchAllProjects();
  },
}
</script>
