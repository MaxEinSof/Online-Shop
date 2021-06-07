<template>
  <table class="table">
    <thead>
    <tr>
      <th>Наименование</th>
      <th>Количество</th>
      <th>Цена (шт)</th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="product in products"
      :key="product.id"
    >
      <td> {{ product.title }}</td>
      <td>
        <button
          class="btn primary"
          :disabled="isIncreaseButtonDisabled(product)"
          @click="addProduct(product)"
        >+</button>

        {{ productQuantity(product.id) }} шт.

        <button
          class="btn danger"
          @click="removeProduct(product)"
        >-</button>
      </td>
      <td> {{ formatCurrency(product.price) }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import formatCurrency from '@/utils/format-currency'

export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  setup() {
    const store = useStore()

    const productQuantity = computed(() => store.getters['cart/productQuantity'])
    const isIncreaseButtonDisabled = computed(() => product => productQuantity.value(product.id) === product.inStock)

    function addProduct(product) {
      store.commit('cart/addProduct', product)
    }

    function removeProduct(product) {
      store.commit('cart/removeProduct', product)
    }

    return {
      productQuantity,
      isIncreaseButtonDisabled,
      addProduct,
      removeProduct,
      formatCurrency
    }
  }
}
</script>
