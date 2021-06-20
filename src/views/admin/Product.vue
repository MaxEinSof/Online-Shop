<template>
  <app-loader
    v-if="isLoading"
    color="white"
  />

  <app-page
    v-else-if="initial.title"
    :title="initial.title"
    back="/admin/products"
  >
    <img
      :src="initial.img"
      :alt="initial.title"
      width="150"
      height="150"
    />

    <form @submit.prevent="productModel.onSubmit">
      <app-input
        id="title"
        label="Название"
        v-model="productModel.title"
        :error="productModel.titleError"
        :blur="productModel.titleBlur"
      />

      <app-input
        id="img"
        label="Изображение"
        v-model="productModel.img"
        :error="productModel.imgError"
        :blur="productModel.imgBlur"
      />

      <app-input
        type="number"
        id="inStock"
        label="Количество"
        v-model.number="productModel.inStock"
        :error="productModel.inStockError"
        :blur="productModel.inStockBlur"
      />

      <app-input
        type="number"
        id="price"
        label="Цена"
        v-model.number="productModel.price"
        :error="productModel.priceError"
        :blur="productModel.priceBlur"
      />

      <app-select
        id="category"
        label="Категория"
        v-model="productModel.category"
        :options="selectOptions"
        :error="productModel.categoryError"
        :blur="productModel.categoryBlur"
      />

      <button
        class="btn danger"
        type="button"
        @click="removeConfirm = true"
      >Удалить</button>

      <button
        v-if="hasChanges"
        class="btn"
        type="submit"
        :disabled="productModel.isSubmitting || !productModel.title || !productModel.img || productModel.inStock === undefined || !productModel.price || !productModel.category"
      >Обновить</button>
    </form>
  </app-page>

  <p
    class="text-center text-white"
    v-else
  >Товар не найден</p>

  <teleport to="body">
    <app-confirm
      v-if="removeConfirm"
      title="Удалить товар?"
      @confirm="removeProduct"
      @reject="removeConfirm = false"
    />
  </teleport>

  <teleport to="body">
    <app-confirm
      v-if="leaveConfirm"
      title="Есть несохраненные изменения. Вы хотите покинуть страницу?"
      @confirm="navigate"
      @reject="leaveConfirm = false"
    />
  </teleport>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import useLeaveGuard from '@/use/leave-guard'
import useProductValidation from '@/use/product-validation'
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import AppInput from '@/components/ui/AppInput'
import AppSelect from '@/components/ui/AppSelect'
import AppConfirm from '@/components/ui/AppConfirm'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const isLoading = ref(true)
    const removeConfirm = ref(false)
    const initial = ref()
    let productValueNames

    onMounted(async () => {
      initial.value = await store.dispatch('products/loadProductById', route.params.id)
      productValueNames = Object.keys(initial.value)
      setModelsToInitialValues()
      await store.dispatch('categories/loadCategories')
      isLoading.value = false
    })

    const productModel = reactive(useProductValidation(updateProduct))

    const productData = computed(() => {
      return productValueNames.reduce((acc, name) => {
        acc[name] = productModel[name]
        return acc
      }, {})
    })

    const hasChanges = computed(() => {
      return productValueNames.reduce((acc, name) => {
        return productModel[name] !== initial.value[name] || acc
      }, false)
    })

    const selectOptions = computed(() => store.getters['categories/selectOptions'])

    function setModelsToInitialValues() {
      productValueNames.forEach(name => {
        productModel[name] = initial.value[name]
      })
    }

    async function removeProduct() {
      removeConfirm.value = false
      await store.dispatch('products/removeProduct', productData.value.id)

      if (hasChanges.value) {
        setModelsToInitialValues()
      }

      router.push({ name: 'AdminProducts' })
    }

    async function updateProduct() {
      await store.dispatch('products/updateProduct', productData.value)
      initial.value = { ...productData.value }
    }

    return {
      productModel,
      initial,
      isLoading,
      removeConfirm,
      selectOptions,
      hasChanges,
      removeProduct,
      ...useLeaveGuard(hasChanges)
    }
  },
  components: { AppConfirm, AppLoader, AppPage, AppInput, AppSelect }
}
</script>
