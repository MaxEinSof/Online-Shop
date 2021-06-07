<template>
  <app-page title="Категории">
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

    <categories-table
      v-else-if="categories.length"
      :categories="categories"
    />

    <p v-else>Категорий нет</p>

    <teleport to="body">
      <app-modal
        v-if="modal"
        title="Создать категорию"
        @close="modal = false"
      >
        <categories-modal
          @created="modal = false"
        />
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import CategoriesTable from '@/components/admin/CategoriesTable'
import AppModal from '@/components/ui/AppModal'
import CategoriesModal from '@/components/admin/CategoriesModal'

export default {
  setup() {
    const store = useStore()
    const isLoading = ref(true)
    const modal = ref(false)

    onMounted(async () => {
      await store.dispatch('categories/loadCategories')
      isLoading.value = false
    })

    const categories = computed(() => store.getters['categories/categories'])

    return {
      isLoading,
      categories,
      modal
    }
  },
  components: { AppPage, AppLoader, CategoriesTable, AppModal, CategoriesModal }
}
</script>
