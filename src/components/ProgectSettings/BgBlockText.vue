<template>
  <div :class="`text-block-bg ${preview ? 'preview' : ''}`" :style="bgImage">
    <ControlBlock
        v-if="!preview"
        :idBlock="content.id"
    />
    <div class="container">
      <div
          class="text-block-bg__title"
          v-if="content.title"
      >
        {{ content.title }}
      </div>
      <div
          class="text-block-bg__description"
      >
        {{ content.description }}
      </div>
    </div>
  </div>
</template>

<script>
import ControlBlock from "@/components/ProgectSettings/ControlBlock";
import routers from "@/routers";

export default {
  name: "BgBlockText",
  components: {ControlBlock},
  props: ['content'],
  computed: {
    bgImage() {
      return `background-image: url(${require('@/assets/images/pages/3.jpeg')})`
    },
    preview() {
      return +routers.currentRoute.value.fullPath.includes('preview')
    }
  }

}
</script>