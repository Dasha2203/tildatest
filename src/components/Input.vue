<template>
  <div :class="`input ${error ? 'input-error' : ''}`">
    <input
        type="text"
        :autofocus="autofocus"
        :value="title"
        @input="$emit('changeTitle', $event.target.value)"
        placeholder="Введите текст"
    />
    <div
        :class="`input__text-error ${error ? `input__text-error-show` : null}`"
    >
      {{ error }}
    </div>
  </div>
</template>

<script>

export default {
  name: "Input",
  props: {
    title: {
      type: String
    },
    autofocus: {
      type: Boolean
    },
    error: {
      type: String
    }
  }
}
</script>