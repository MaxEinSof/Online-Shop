<template>
  <app-page title="Инвентарь">
    <template #header>
      <button
        class="btn primary"
        v-if="!isLoading"
        @click="modal = true"
      >Создать</button>
    </template>

    <app-loader
      v-if="isLoading"
      color="blue"
    />

    <template v-else-if="allProducts.length">
      <products-table :products="selectedProducts"/>

      <app-pagination
        v-if="allProducts.length > PRODUCTS_LIMIT"
        :count="allProducts.length"
        :limit="PRODUCTS_LIMIT"
        v-model="activePage"
      />
    </template>

    <p v-else>Товаров нет</p>

    <teleport to="body">
      <app-modal
        v-if="modal"
        title="Создать товар"
        @close="modal = false"
      >
        <products-modal @created="modal = false"/>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import ProductsTable from '@/components/admin/ProductsTable'
import ProductsModal from '@/components/admin/ProductsModal'
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import AppModal from '@/components/ui/AppModal'
import AppPagination from '@/components/ui/AppPagination'
import chunk from 'lodash.chunk'

export default {
  setup() {
    const PRODUCTS_LIMIT = 5
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const isLoading = ref(true)
    const modal = ref(false)
    const activePage = ref(+route.query.page || 1)

    watch(activePage, setPage)

    onMounted(async () => {
      await store.dispatch('products/loadProducts')
      await store.dispatch('categories/loadCategories')
      setPage()
      isLoading.value = false
    })

    const allProducts = computed(() => store.getters['products/products'])

    const selectedProducts = computed(() => {
      if (allProducts.value.length) {
        let index = activePage.value * PRODUCTS_LIMIT - PRODUCTS_LIMIT

        return chunk(allProducts.value, PRODUCTS_LIMIT)[activePage.value - 1]
          .map(product => {
            product.tableNumber = ++index
            return product
          })
      }
      return []
    })

    function setPage() {
      router.replace({
        query: {
          page: activePage.value
        }
      })
    }

    return {
      PRODUCTS_LIMIT,
      isLoading,
      modal,
      activePage,
      allProducts,
      selectedProducts
    }
  },
  components: { ProductsTable, ProductsModal, AppPage, AppLoader, AppModal, AppPagination }
}
</script>
