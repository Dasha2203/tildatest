<template>
  <div class="modal" @click.self="$emit('closeModal')">
    <div class="modal__container">
      <slot></slot>
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
