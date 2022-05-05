<template>
  <div class="modal" @click.self="$emit('closeModal')">
    <div class="modal__container">
      <div class="modal__header">
        <slot name="header"></slot>
      </div>
      <div class="modal__body">
        <slot name="body"></slot>
      </div>
      <div class="modal__footer">
        <slot name="footer"></slot>
      </div>
      <div class="modal__close" @click="$emit('closeModal')">
        <svg class="icon">
          <use xlink:href="#close"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Modal"
}

</script>
