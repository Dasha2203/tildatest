<template>
  <div @click="handleClick">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import {mapActions, mapGetters} from "vuex";
export default {
  name: 'App',
  components: {
    Header
  },
  computed: {
    ...mapGetters(['getOpenProjectOptions'])
  },
  methods: {
    ...mapActions(['changeOpenProjectOptions']),
    handleClick() {
      if (this.getOpenProjectOptions) {
        this.changeOpenProjectOptions({id: null})
      }
    }
  }
}
</script>
