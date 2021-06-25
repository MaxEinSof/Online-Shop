<template>
  <nav class="navbar">
    <h3>Online Shop</h3>

    <ul class="navbar-menu">
      <li v-if="isAuthenticated && user">
        <a
          href="#"
          @click.prevent
        > {{ user.name }} </a>
      </li>
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li>
        <router-link to="/cart">Корзина</router-link>
        <span class="badge warning filled"> {{ cartTotalQuantity }} </span>
      </li>
      <li v-if="isAuthenticated">
        <a
          href="#"
          @click.prevent="logout"
        >Выйти</a>
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

    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

    const user = computed(() => store.getters['auth/user'])

    function logout() {
      store.commit('auth/removeToken')
    }

    return {
      cartTotalQuantity,
      isAuthenticated,
      user,
      logout
    }
  }
}
</script>
