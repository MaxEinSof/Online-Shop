<template>
  <nav class="navbar">
    <h3>Админка</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/admin/products">Инвентарь</router-link>
      </li>
      <li>
        <router-link to="/admin/categories">Категории</router-link>
      </li>
      <li>
        <a
          href="#"
          @click.prevent="logout"
        >Выйти</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    function logout() {
      store.commit('auth/removeToken')
      router.push('/auth')
    }

    return { logout }
  }
}
</script>
