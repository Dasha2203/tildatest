<template>
  <div class="card-project">
    <router-link class="card-project__link" :to="project.link">
      <div class="card-project__header">
        <div class="card-project__title">
          {{ project.title }} {{project.id}}
        </div>
      </div>

    </router-link>
    <div class="card-project__footer">
      <div class="btn-with-icon">
        <div class="icon light">
          <svg width="14px" height="14px" style="display:block; width:14px;" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 28.21 28">
            <g>
              <rect style="fill:#f78369;" x="20.41" y="2.17" width="7.63" height="3.63"
                    transform="translate(9.91 -15.97) rotate(45)"></rect>
              <rect style="fill:#f78369;" x="11.41" y="3.89" width="7.63" height="18.18"
                    transform="translate(13.64 -6.97) rotate(45)"></rect>
              <polygon style="fill:#f78369;" points="0 28 4.45 18.36 9.85 23.76 0 28"></polygon>
            </g>
          </svg>
        </div>
        <span class="btn-with-icon__text">
          РЕДАКТИРОВАТЬ САЙТ
        </span>
      </div>
      <div class="btn-with-icon">
        <div class="icon light">
          <svg width="14px" height="14px" style="display:block; width:14px;" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 26.14 26.14">
            <g>
              <polygon style="fill:#f68269;"
                       points="20.14 23.14 3 23.14 3 6 12.57 6 12.57 3 0 3 0 26.14 23.14 26.14 23.14 13.57 20.14 13.57 20.14 23.14"></polygon>
              <polygon style="fill:#f68269;"
                       points="16.14 0 16.14 3 21.02 3 7.24 16.78 9.36 18.9 23.14 5.12 23.14 10 26.14 10 26.14 0 16.14 0"></polygon>
            </g>
          </svg>
        </div>
        <span class="btn-with-icon__text">
          https://vk.com
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProject",
  props: {
    project: {
      type: Object,
      required: true
    }
  },
}
</script>
