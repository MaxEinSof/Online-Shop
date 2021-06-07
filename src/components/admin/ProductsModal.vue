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
      id="img"
      label="Изображение"
      v-model="img"
      :error="imgError"
      :blur="imgBlur"
    />

    <app-input
      type="number"
      id="inStock"
      label="Количество"
      v-model.number="inStock"
      :error="inStockError"
      :blur="inStockBlur"
    />

    <app-input
      type="number"
      id="price"
      label="Цена"
      v-model.number="price"
      :error="priceError"
      :blur="priceBlur"
    />

    <app-select
      id="category"
      label="Категория"
      v-model="category"
      :options="selectOptions"
      :error="categoryError"
      :blur="categoryBlur"
    />

    <button
      class="btn primary"
      type="submit"
      :disabled="isSubmitting || !title || !img || inStock === undefined || !price || !category"
    >Создать</button>
  </form>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AppInput from '@/components/ui/AppInput'
import AppSelect from '@/components/ui/AppSelect'
import useProductValidation from '@/use/product-validation'

export default {
  emits: ['created'],
  setup(props, { emit }) {
    const store = useStore()

    const selectOptions = computed(() => store.getters['categories/selectOptions'])

    async function submit(values) {
      await store.dispatch('products/createProduct', values)
      emit('created')
    }

    return {
      selectOptions,
      ...useProductValidation(submit)
    }
  },
  components: { AppInput, AppSelect }
}
</script>
