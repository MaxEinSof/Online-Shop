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
import useProductControls from '@/use/product-controls'

export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  setup() {
    return useProductControls()
  }
}
</script>
