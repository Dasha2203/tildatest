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
import Modal from "@/components/Modal";
import Input from "@/components/Input";
export default {
  name: 'App',
  components: {
    Input,
    Modal,
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
