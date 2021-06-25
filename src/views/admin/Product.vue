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

    <product-form
      :product-models="productModels"
      :product-validation-helpers="productValidationHelpers"
      :has-changes="hasChanges"
      @update-product-models="updateProductModels"
      v-model:remove-confirm="removeConfirm"
    />
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
import useProductValidation from '@/use/product-validation'
import useLeaveGuard from '@/use/leave-guard'
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import ProductForm from '@/components/admin/ProductForm'
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
      updateProductModels(initial.value)
      await store.dispatch('categories/loadCategories')
      isLoading.value = false
    })

    const productModels = reactive({
      id: route.params.id
    })

    const productValidationHelpers = ref({});

    ({
      title: productModels.title,
      img: productModels.img,
      inStock: productModels.inStock,
      price: productModels.price,
      category: productModels.category,
      ...productValidationHelpers.value
    } = useProductValidation(updateProduct))

    const hasChanges = computed(() => {
      return productValueNames.reduce((acc, name) => {
        return productModels[name] !== initial.value[name] || acc
      }, false)
    })

    function updateProductModels(values) {
      productValueNames.forEach(name => {
        productModels[name] = values[name]
      })
    }

    async function updateProduct() {
      await store.dispatch('products/updateProduct', productModels)
      initial.value = { ...productModels }
    }

    async function removeProduct() {
      removeConfirm.value = false
      await store.dispatch('products/removeProduct', productModels.id)

      if (hasChanges.value) {
        updateProductModels(initial.value)
      }

      router.push({ name: 'AdminProducts' })
    }

    return {
      productModels,
      productValidationHelpers,
      initial,
      isLoading,
      removeConfirm,
      hasChanges,
      updateProductModels,
      removeProduct,
      ...useLeaveGuard(hasChanges)
    }
  },
  components: { AppConfirm, AppLoader, AppPage, ProductForm }
}
</script>
