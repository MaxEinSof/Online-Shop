<template>
  <app-page
    title="Корзина"
    back="/"
    center
  >
    <app-loader
      v-if="isLoading"
      color="blue"
    />

    <template v-else-if="products.length">
      <cart-products :products="products"/>

      <hr>

      <p class="text-right">
        <strong>Всего: {{ formatCurrency(totalPrice) }}</strong>
      </p>

      <p class="text-right">
        <button class="btn">Оплатить</button>
      </p>
    </template>

    <p class="text-center"
       v-else
    >В корзине пока ничего нет</p>
  </app-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import formatCurrency from '@/utils/format-currency'
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import CartProducts from '@/components/cart/CartProducts'

export default {
  setup() {
    const store = useStore()
    const isLoading = ref(true)

    onMounted(async () => {
      await store.dispatch('products/loadProducts')
      isLoading.value = false
    })

    const cart = computed(() => store.getters['cart/cart'])

    const products = computed(() => {
      return store.getters['products/products']
        .filter(product => cart.value[product.id])
    })

    const totalPrice = computed(() => {
      return products.value.reduce((acc, product) => {
        acc += product.price * cart.value[product.id]
        return acc
      }, 0)
    })

    return {
      isLoading,
      products,
      totalPrice,
      formatCurrency
    }
  },
  components: { AppPage, AppLoader, CartProducts }
}
</script>
