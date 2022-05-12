<template>
  <div class="control-block">
    <div class="control-block__left">
      <div class="control-block__button">
        <svg>
          <use xlink:href="#settings"/>
        </svg>
        Настройки
      </div>
      <div class="control-block__button">
        <svg>
          <use xlink:href="#pencil"/>
        </svg>
        Контент
      </div>
    </div>
    <div class="control-block__right">
      <div class="control-block__button" @click="duplicateBlock">
        <svg>
          <use xlink:href="#copy"/>
        </svg>
      </div>
      <div class="control-block__button" @click="removeBlock">
        <svg>
          <use xlink:href="#remove"/>
        </svg>
      </div>
      <div class="control-block__button">
        <svg>
          <use xlink:href="#hide"/>
        </svg>
      </div>
      <div class="control-block__button" @click="moveBlockUp">
        <span class="arrow-up"></span>
      </div>
      <div class="control-block__button" @click="moveBlockDown">
        <span class="arrow-down"></span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import routers from "@/routers";

export default {
  name: "ControlBlock",
  props: ['idBlock'],
  data() {
    return {
      idPage: +routers.currentRoute.value.params.id,
    }
  },
  methods: {
    ...mapActions([
      'removeSelectBlock',
      'moveSelectBlock',
      "duplicateSelectBlock"
    ]),
    removeBlock() {
      this.removeSelectBlock({idBlock: this.idBlock, idPage: this.idPage})
    },

    moveBlockUp() {
      this.moveSelectBlock({idBlock: this.idBlock, idPage: this.idPage, direction: 'up'})
    },

    moveBlockDown() {
      this.moveSelectBlock({idBlock: this.idBlock, idPage: this.idPage, direction: 'down'})
    },

    duplicateBlock() {
      this.duplicateSelectBlock({idBlock: this.idBlock, idPage: this.idPage});
    },
  }
}
</script>

<style scoped>

</style>