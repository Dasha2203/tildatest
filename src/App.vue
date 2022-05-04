<template>
  <div @click="handleClick">
    <Header/>
    <router-view/>
    <Symbols/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import {mapActions, mapGetters} from "vuex";
import Symbols from "@/components/Symbols";
export default {
  name: 'App',
  components: {
    Symbols,
    Header
  },
  computed: {
    ...mapGetters(['getOpenProjectOptions'])
  },
  methods: {
    ...mapActions(['changeOpenProjectOptions', 'fetchAllProjects']),
    handleClick() {
      if (this.getOpenProjectOptions) {
        this.changeOpenProjectOptions({id: null})
      }
    }
  },
  mounted() {
    this.fetchAllProjects();
  },
}
</script>
