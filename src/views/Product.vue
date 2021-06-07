<template>
  <app-loader
    v-if="isLoading"
    color="white"
  />

  <app-page
    v-else-if="product"
    :title="product.title"
    back="/"
    center
  >
    <img
      :src="product.img"
      :alt="product.title"
    />

    <p>Категория: <strong> {{ categoryName }} </strong></p>

    <product-controls :product="product"/>
  </app-page>

  <p
    class="text-center text-white"
    v-else
  >Товар не найден</p>
</template>

<script>
import {ref, onMounted, computed} from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import ProductControls from '@/components/product/ProductControls'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const isLoading = ref(true)
    const product = ref()

    onMounted(async () => {
      product.value = await store.dispatch('products/loadProductById', route.params.id)
      await store.dispatch('categories/loadCategories')

      isLoading.value = false
    })

    const categoryName = computed(() => store.getters['categories/categoryName'](product.value.category))

    return {
      isLoading,
      product,
      categoryName
    }
  },
  components: { AppLoader, AppPage, ProductControls }
}
</script>
