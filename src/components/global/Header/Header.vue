<template>
  <div class="header">
    <div class="header__container">
      <Navigation/>
      <HeaderMenu v-if="settingsPage"/>
    </div>
  </div>
</template>

<script>
import routers from "@/routers";

import Navigation from "@/components/global/Header/Navigation";
import HeaderMenu from "@/components/ProgectSettings/HeaderMenu";

export default {
  name: "Header",
  computed: {
    settingsPage() {
      let path = routers.currentRoute.value.fullPath;
      return path.includes('/project/settings/page/');
    }
  },
  components: {
    HeaderMenu,
    Navigation
  },
}
</script>
