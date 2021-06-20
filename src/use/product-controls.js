import { computed } from 'vue'
import { useStore } from 'vuex'
import formatCurrency from '@/utils/format-currency'

export default function useProductControls() {
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
