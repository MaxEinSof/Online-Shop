<template>
  <div class="card">
    <shop-filter v-model="filter"/>

    <shop-products :products="products" :is-loading="isLoading"/>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ShopFilter from '@/components/shop/ShopFilter'
import ShopProducts from '@/components/shop/ShopProducts'

export default {
  setup() {
    const store = useStore()
    const filter = ref({})
    const isLoading = ref(true)

    onMounted(async () => {
      await store.dispatch('products/loadProducts')
      isLoading.value = false
    })

    const products = computed(() => {
      return store.getters['products/products']
        ?.filter(product => {
          if (filter.value.name) {
            return product.title.toLowerCase().includes(filter.value.name.toLowerCase())
          }
          return product
        })
        .filter(product => {
          if (filter.value.type) {
            return product.category === filter.value.type
          }
          return product
        })
    })

    document.title = 'Online Shop'

    return {
      filter,
      isLoading,
      products
    }
  },
  components: { ShopFilter, ShopProducts }
}
</script>

<style lang="scss" scoped>
.card {
  border-radius: 4px;
  padding: 0;
  display: flex;
}
</style>
