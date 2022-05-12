<template>
  <div :class="`textarea ${error ? 'textarea-error' : ''}`">
    <label v-if="!!label">{{label}}</label>
    <textarea
        type="text"
        :name="name"
        :autofocus="autofocus"
        :value="title"
        :placeholder=" placeholder || 'Введите текст'"
        :disabled="disabled"
        @input="$emit('changeInput', $event)"
        res
    />
    <div
        :class="`textarea__text-error ${error ? `textarea__text-error-show` : null}`"
    >
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TextArea",
  props:  ['title','autofocus', 'error', 'placeholder', 'label', 'name', 'disabled']
}
</script>