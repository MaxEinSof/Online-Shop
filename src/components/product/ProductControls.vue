<template>
  <div
    class="product-controls"
    v-if="productQuantity(product.id)"
  >
    <button
      class="btn danger"
      @click.stop="removeProduct(product)"
    >-</button>

    <strong> {{ productQuantity(product.id) }} </strong>

    <button
      class="btn primary"
      :disabled="isIncreaseButtonDisabled(product)"
      @click.stop="addProduct(product)"
    >+</button>
  </div>

  <button
    class="btn"
    v-else-if="product.inStock > 0"
    @click.stop="addProduct(product)"
  >
    {{ formatCurrency(product.price) }}
  </button>

  <p v-else>Нет в наличии</p>
</template>

<script>
import useProductControls from '@/use/product-controls'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup() {
    return useProductControls()
  }
}
</script>
