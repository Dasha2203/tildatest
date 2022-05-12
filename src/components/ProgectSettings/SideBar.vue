<template>
  <div
      :class="`sidebar ${active ? 'sidebar-active' : ''}`"
      @click.self="$emit('close')"
  >
    <div class="sidebar-container">
      <div class="sidebar__column">
        <div class="sidebar__header">
          <div class="sidebar__title">
            Библиотека блоков
          </div>
          <button type="button" class="btn-icon">
            <svg>
              <use xlink:href="#search"></use>
            </svg>
          </button>
          <button type="button" class="btn-icon" @click="$emit('close')">
            <svg>
              <use xlink:href="#close"></use>
            </svg>
          </button>
        </div>
        <div
            v-for="category in categories"
            :key="category.id"
            :class="`sidebar__item ${category.id === selectCategory ? 'sidebar__item-active': ''}`"
            @click="selectCategory = category.id"
        >
          {{ category.title }}
        </div>

      </div>
      <div class="sidebar__column">
        <div
            class="sidebar__item"
            v-for="block in blocks"
            :key="block.id"
            @click="$emit('addBlock', block)"
        >
          <div class="sidebar__title">
            {{ block.title }}
          </div>
          <div class="sidebar__text">
            {{ block.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SideBar",
  data() {
    return {
      selectCategory: '',
      blocks: []
    }
  },
  props: {
    active: {
      type: Boolean
    }
  },
  methods: {
    ...mapGetters(['getCategoryBlocks', "getBlocks"]),
    ...mapActions(["addBlockToPage"]),
  },
  computed: {
    categories() {
      return this.getCategoryBlocks();
    },
    ...mapGetters(['getBlocksByCategory']),
  },
  watch: {
    selectCategory() {
      this.blocks = this.getBlocksByCategory(this.selectCategory)
    }
  }
}
</script>