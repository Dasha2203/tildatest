<template>
  <div class="page settings-page">
    <div class="page__header">
      <div class="container">
        <h1>{{getPageById(+$route.params.id).title}}</h1>
      </div>
    </div>
    <div class="settings-page__body">
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
    />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import SideBar from "@/components/ProgectSettings/SideBar";

export default {
  name: "ProjectSettings",
  components: {SideBar},
  data() {
    return {
      openSideBar: false
    }
  },
  computed: mapGetters(['getPageById'])
}
</script>