<template>
  <nav class="navbar">
    <h3>Online Shop</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li>
        <router-link to="/cart">Корзина</router-link>
        <span class="badge warning filled"> {{ cartTotalQuantity }} </span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const cartTotalQuantity = computed(() => store.getters['cart/totalQuantity'])

    return {
      cartTotalQuantity
    }
  }
}
</script>
