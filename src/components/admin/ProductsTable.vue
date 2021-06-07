<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Название</th>
      <th>Изображение</th>
      <th>Цена</th>
      <th>Категория</th>
      <th>Количество</th>
      <th>Действие</th>
    </tr>
    </thead>

    <tbody>
    <tr
      v-for="product in products"
      :key="product.id"
    >
      <td> {{ product.tableNumber }} </td>
      <td> {{ product.title }} </td>
      <td>
        <img
          :src="product.img"
          :alt="product.title"
          width="50"
          height="50"
        >
      </td>
      <td> {{ formatCurrency(product.price) }} </td>
      <td> {{ categoryName(product.category) }} </td>
      <td> {{ product.inStock }} </td>
      <td>
        <router-link
          :to="`/admin/product/${product.id}`"
          v-slot="{ navigate }"
          custom
        >
          <button
            class="btn"
            @click="navigate"
          >Открыть</button>
        </router-link>
      </td>
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

    const categoryName = computed(() => category => store.getters['categories/categoryName'](category))

    return {
      categoryName,
      formatCurrency
    }
  }
}
</script>
