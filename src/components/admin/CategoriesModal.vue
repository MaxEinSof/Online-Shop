<template>
  <form @submit.prevent="onSubmit">
    <app-input
      id="title"
      label="Название"
      v-model="title"
      :error="titleError"
      :blur="titleBlur"
    />

    <app-input
      id="type"
      label="Тип"
      v-model="type"
      :error="typeError"
      :blur="typeBlur"
    />

    <button
      class="btn primary"
      type="submit"
      :disabled="isSubmitting || !title || !type"
    >Создать</button>
  </form>
</template>

<script>
import { useStore } from 'vuex'
import AppInput from '@/components/ui/AppInput'
import useCategoryValidation from '@/use/category-validation'

export default {
  emits: ['created'],
  setup(props, { emit }) {
    const store = useStore()

    async function submit(values) {
      await store.dispatch('categories/createCategory', values)
      emit('created')
    }

    return useCategoryValidation(submit)
  },
  components: { AppInput }
}
</script>
