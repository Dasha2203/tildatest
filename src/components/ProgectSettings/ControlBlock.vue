<template>
  <div class="control-block">
    <div class="control-block__left">
      <div class="control-block__button">
        <svg>
          <use xlink:href="#settings"/>
        </svg>
        Настройки
      </div>
      <div class="control-block__button" @click="$emit('editBlock')">
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
      <div class="control-block__button" @click="turnHiddenBlock">
        <svg>
          <use :xlink:href="`${block.hide ? '#hide' : '#show'}`"/>
        </svg>
      </div>
      <div
          :class="`control-block__button ${idx === 0 ? 'disable': ''}`"
          @click="moveBlockUp"
      >
        <span class="arrow-up"></span>
      </div>
      <div :class="`control-block__button ${idx === lastIdx ? 'disable': ''}`" @click="moveBlockDown">
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
  props: ['block', 'idx', 'lastIdx'],
  data() {
    return {
      idPage: +routers.currentRoute.value.params.id,
    }
  },
  computed: {
    payloadData() {
      return {idBlock: this.block.id, idPage: this.idPage}
    }
  },
  methods: {
    ...mapActions([
      'removeSelectBlock',
      'moveSelectBlock',
      'duplicateSelectBlock',
      'turnShowBlock',
    ]),
    removeBlock() {
      this.removeSelectBlock(this.payloadData)
    },

    moveBlockUp() {
      if (this.idx > 0) {
        this.moveSelectBlock({...this.payloadData, direction: 'up'})
      }
    },

    moveBlockDown() {
      if (this.idx < this.lastIdx) {
        this.moveSelectBlock({...this.payloadData, direction: 'down'})
      }
    },

    turnHiddenBlock() {
      this.turnShowBlock(this.payloadData)
    },

    duplicateBlock() {
      this.duplicateSelectBlock(this.payloadData);
    },
  }
}
</script>

<style scoped>

</style>