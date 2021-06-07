<template>
  <div :class="[
      'form-control',
      {invalid: error},
    ]">
    <label :for="id"> {{ label }} </label>

    <input
      :type="type"
      :id="id"
      :value="modelValue"
      @input="changeValue"
      @blur="blur"
    >

    <small v-if="error"> {{ error }} </small>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    error: {
      type: String,
      required: false
    },
    blur: {
      type: Function,
      required: false
    },
    modelValue: [String, Number]
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    return {
      changeValue: evt => emit('update:modelValue', evt.target.value)
    }
  }
}
</script>
