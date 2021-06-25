<template>
  <form @submit.prevent="productValidationHelpers.onSubmit">
    <app-input
      id="title"
      label="Название"
      v-model="product.title"
      :error="productValidationHelpers.titleError"
      :blur="productValidationHelpers.titleBlur"
    />

    <app-input
      id="img"
      label="Изображение"
      v-model="product.img"
      :error="productValidationHelpers.imgError"
      :blur="productValidationHelpers.imgBlur"
    />

    <app-input
      type="number"
      id="inStock"
      label="Количество"
      v-model.number="product.inStock"
      :error="productValidationHelpers.inStockError"
      :blur="productValidationHelpers.inStockBlur"
    />

    <app-input
      type="number"
      id="price"
      label="Цена"
      v-model.number="product.price"
      :error="productValidationHelpers.priceError"
      :blur="productValidationHelpers.priceBlur"
    />

    <app-select
      id="category"
      label="Категория"
      v-model="product.category"
      :options="selectOptions"
      :error="productValidationHelpers.categoryError"
      :blur="productValidationHelpers.categoryBlur"
    />

    <button
      class="btn danger"
      type="button"
      @click="removeProduct"
    >Удалить</button>

    <button
      v-if="hasChanges"
      class="btn"
      type="submit"
      :disabled="productValidationHelpers.isSubmitting || !product.title || !product.img || product.inStock === undefined || !product.price || !product.category"
    >Обновить</button>
  </form>
</template>

<script>
import { computed, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import AppInput from '@/components/ui/AppInput'
import AppSelect from '@/components/ui/AppSelect'

export default {
  props: ['productModels', 'productValidationHelpers', 'hasChanges', 'removeConfirm'],
  emits: ['updateProductModels', 'update:removeConfirm'],
  setup(props, { emit }) {
    const store = useStore()

    const product = reactive({ ...props.productModels })

    watch(product, value => {
      emit('updateProductModels', value)
    })

    const selectOptions = computed(() => store.getters['categories/selectOptions'])

    function removeProduct() {
      emit('update:removeConfirm', true)
    }

    return {
      product,
      selectOptions,
      removeProduct
    }
  },
  components: { AppInput, AppSelect }
}
</script>
