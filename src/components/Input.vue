<template>
  <div :class="`input ${error ? 'input-error' : ''}`">
    <label v-if="!!label">{{label}}</label>
    <input
        type="text"
        :name="name"
        :autofocus="autofocus"
        :value="title"
        :placeholder=" placeholder || 'Введите текст'"
        :disabled="disabled"
        @input="$emit('changeInput', $event)"
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
  props:  ['title','autofocus', 'error', 'placeholder', 'label', 'name', 'disabled']
}
</script>