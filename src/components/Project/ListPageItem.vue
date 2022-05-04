<template>
  <div class="list-page__item">
    <div class="list-page__img">
      <img :src="require('@/assets/images/page-img.jpeg')" alt="page image">
    </div>
    <div class="list-page__title">
      {{page.title}}
    </div>
    <div class="list-page__buttons">
      <router-link :to="`/project/settings/page/${page.id}`">
      <button type="button" class="list-page__button">
        <svg>
          <use xlink:href="#settings"></use>
        </svg>
        Настройки
      </button>
      </router-link>
      <button type="button" class="list-page__button" @click="$emit('remove', page.id)">
        <svg>
          <use xlink:href="#remove"></use>
        </svg>
        Удалить
      </button>
      <button type="button" class="list-page__button">
        <svg>
          <use xlink:href="#link"></use>
        </svg>
        Ссылка
      </button>

    </div>
    <div class="list-page__type">
      Home page
    </div>
  </div>
</template>

<script>

export default {
  name: "ListPageItem",
  props: {
    page: {
      type: Object
    }
  }
}
</script>