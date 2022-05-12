<template>
  <div :class="`block-hidden ${preview ? 'preview' : ''}`">
    <ControlBlock
        v-if="!preview"
        :block="content"
        :idx="idx"
        :lastIdx="lastIdx"
    />
    <div class="container">
      Блок спрятан
    </div>
  </div>
</template>

<script>
import routers from "@/routers";
import ControlBlock from "@/components/ProgectSettings/ControlBlock";

export default {
  name: "HiddenBlock",
  components: {ControlBlock},
  props: ['content', 'idx', 'lastIdx'],
  computed: {
    preview() {
      return +routers.currentRoute.value.fullPath.includes('preview')
    }
  }
}
</script>

<style scoped>

</style>