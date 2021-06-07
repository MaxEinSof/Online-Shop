<template>
  <div class="pagination">
    <button
      class="btn"
      type="button"
      :disabled="modelValue === 1"
      @click="$emit('update:modelValue', modelValue - 1)"
    >&lt;</button>

    <button
      type="button"
      v-for="number in pageNumbers"
      :key="number"
      :class="[
        'btn',
        { primary: modelValue ===  number }
      ]"
      @click="$emit('update:modelValue', number)"
    >
      {{ number }}
    </button>

    <button
      class="btn"
      type="button"
      :disabled="modelValue === pageNumbers"
      @click="$emit('update:modelValue', modelValue + 1)"
    >&gt;</button>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  props: ['count', 'limit', 'modelValue'],
  emits: ['update:modelValue'],
  setup(props) {
    return {
      pageNumbers: computed(() => Math.ceil(props.count / props.limit))
    }
  }
}
</script>
