<template>
  <app-page
    title="Корзина"
    back="/"
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

      <p
        class="text-right"
        v-if="isAuthenticated"
      >
        <button
          class="btn"
          @click="onPay"
        >Оплатить</button>
      </p>

      <auth-form
        v-else
        :submitCallback="submitCallback"
      >
        <template #title>
          <h3>Войдите в систему или создайте аккаунт для совершения покупки</h3>
        </template>

        <template #actions="{ actionsProps }">
          <button
            type="submit"
            class="btn"
            :disabled="!actionsProps.email || !actionsProps.password || actionsProps.isSubmitting || actionsProps.isTooManyAttempts"
            @click="submitAction = 'signUp'"
          >Создать аккаунт</button>
        </template>
      </auth-form>
    </template>

    <p
      class="text-center"
      v-else
    >В корзине пока ничего нет</p>
  </app-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import formatCurrency from '@/utils/format-currency'
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import CartProducts from '@/components/cart/CartProducts'
import AuthForm from '@/components/auth/AuthForm'
import { pay } from '@/utils/pay'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const isLoading = ref(true)
    const submitAction = ref('signIn')

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

    const user = computed(() => store.getters['auth/user'])

    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

    async function submitCallback(values) {
      try {
        await store.dispatch(`auth/${submitAction.value}`, values)
      } catch (e) {
      }
    }

    async function onPay() {
      try {
        await pay({
          description: 'Покупка товаров в онлайн магазине',
          amount: totalPrice.value,
          accountId: user.value.email
        })

        await store.dispatch('orders/createOrder')
        router.push({ name: 'Thanks' })
      } catch (e) {
      }
    }

    return {
      isLoading,
      products,
      totalPrice,
      isAuthenticated,
      submitAction,
      submitCallback,
      formatCurrency,
      onPay
    }
  },
  components: { AppPage, AppLoader, CartProducts, AuthForm }
}
</script>
