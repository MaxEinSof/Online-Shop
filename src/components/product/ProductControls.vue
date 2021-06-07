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
import { computed } from 'vue'
import { useStore } from 'vuex'
import formatCurrency from '@/utils/format-currency'

export default {
  props: {
    product: {
      type: Object,
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
