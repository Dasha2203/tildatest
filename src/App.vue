<template>
  <div>
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
    ...mapGetters('page', ['getOpenSettingsModal']),
    showHeader() {
      return !+routers.currentRoute.value.fullPath.includes('preview')
    }
  },
  methods: {
    ...mapActions(['fetchAllProjects']),
    ...mapActions('page',['changeOpenPageSettings']),
    ...mapActions('libraryBlocks',['getCategory']),
  },
  mounted() {
    this.getCategory();
    this.fetchAllProjects();
  },
}
</script>
