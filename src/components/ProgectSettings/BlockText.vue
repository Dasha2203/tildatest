<template>
  <div class="text-block">
    <ControlBlock
        v-if="showControl"
        :idBlock="content.id"
    />
    <div class="container">
      <div
          class="text-block__title"
          v-if="content.title"
      >
        {{ content.title }}
      </div>
      <div
          class="text-block__description"
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
  name: "BlockText",
  components: {ControlBlock},
  props: ['content'],
  computed: {
    showControl() {
      return !+routers.currentRoute.value.fullPath.includes('preview')
    }
  }
}
</script>