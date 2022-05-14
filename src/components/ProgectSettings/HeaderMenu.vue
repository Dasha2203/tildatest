<template>
  <div class="settings-page-menu">
    <div class="settings-page-menu__item">
      <router-link class="navigation-link" :to="`/project/settings/preview/page/${$route.params.id}`">
        Предпросмотр
      </router-link>
    </div>
    <div class="settings-page-menu__item" @click.stop="openOptions">
      Еще <span class="icon">&#9660;</span>
      <DropDown
        :title="'Настройки сайта'"
        :listData="listOptions"
        v-if="getOpenProjectOptions"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

import DropDown from "@/components/Project/DropDown";
import routers from "@/routers";

export default {
  name: "HeaderMenu",
  components: {DropDown},
  computed: {
    ... mapGetters('project',['getOpenProjectOptions']),
    listOptions() {
      let that = this;
      return [
        {
          name: 'Настройки страницы',
          action() {
            that.openModal()
          }
        },
        {
          name: 'Мои сайты',
          action() {
            that.$router.push('/projects');
          }
        },
        {
          name: 'Профиль',
          action() {
            that.$router.push('/profile');
          }
        }
      ]
    }
  },
  methods: {
    ...mapActions('project', ['changeOpenProjectOptions']),
    ...mapActions('page', ['changeOpenPageSettings']),
    openOptions() {
      this.changeOpenProjectOptions({id: +routers.currentRoute.value.params.id})
    },
    openModal() {
      this.changeOpenPageSettings({open: true})
    },
  }
}
</script>

<style scoped>

</style>