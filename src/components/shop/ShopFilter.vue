<template>
  <div class="products-filter">
    <div class="form-control">
      <input
        type="text"
        placeholder="Найти товар..."
        v-model.trim="name"
      >
      <span
        class="form-control-clear"
        @click="clearSearchBox()"
      >&times;</span>
    </div>

    <app-loader
      v-if="isLoading"
      color="blue"
    />

    <ul
      class="list"
      v-else
    >
      <li
        :class="[
          'list-item',
          {active: activeIndex === -1}
        ]"
        @click="setCategory(null, -1)"
      >Все</li>

      <li
        v-for="(category, index) in categories"
        :key="category.id"
        :class="[
          'list-item',
          {active: activeIndex === index}
        ]"
        @click="setCategory(category.type, index)"
      >
        {{ category.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import AppLoader from '@/components/ui/AppLoader'

export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const isLoading = ref(true)
    const name = ref(null)
    const type = ref(null)
    const activeIndex = ref(-1)

    onMounted(async () => {
      await store.dispatch('categories/loadCategories')
      isLoading.value = false

      setFilterValues()
    })

    const categories = computed(() => store.getters['categories/categories'])

    watch([name, type], values => {
      setQueryParams(values[0], values[1])
      updateFilterValues(values[0], values[1])
    })

    function setFilterValues() {
      name.value = route.query.search

      const categoryIndex = categories.value.findIndex(category => category.type === route.query.category)
      setCategory(route.query.category, categoryIndex)
    }

    function setQueryParams(name, type) {
      const queries = {}

      if (name) {
        queries.search = name
      }

      if (type) {
        queries.category = type
      }

      router.replace({ query: queries })
    }

    function updateFilterValues(name, type) {
      emit('update:modelValue', { name, type })
    }

    function setCategory(categoryType, index) {
      type.value = categoryType
      activeIndex.value = index
    }

    function clearSearchBox() {
      name.value = null
    }

    return {
      isLoading,
      categories,
      name,
      activeIndex,
      setCategory,
      clearSearchBox
    }
  },
  components: { AppLoader }
}
</script>
