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
          const isMatchesNameFilter = filter.value.name ? product.title.toLowerCase().includes(filter.value.name.toLowerCase()) : true
          const isMatchesTypeFilter = filter.value.type ? product.category === filter.value.type : true
          return isMatchesNameFilter && isMatchesTypeFilter
        })
    })

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
