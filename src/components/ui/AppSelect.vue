<template>
  <div :class="[
      'form-control',
      {invalid: error},
    ]">
    <label :for="id"> {{ label }} </label>

    <select
      :id="id"
      :value="modelValue"
      @input="changeValue"
      @blur="blur"
    >
      <option
        v-for="(optionName, optionValue) in options"
        :key="optionValue"
        :value="optionValue"
      > {{ optionName }} </option>
    </select>

    <small v-if="error"> {{ error }} </small>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    options: {
      type: Object,
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
    modelValue: String
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    return {
      changeValue: evt => emit('update:modelValue', evt.target.value)
    }
  }
}
</script>
