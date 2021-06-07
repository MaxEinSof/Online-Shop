<template>
  <div class="products-table">
    <app-loader
      v-if="isLoading"
      color="blue"
    />

    <template v-else-if="products.length">
      <router-link
        v-for="product in products"
        :key="product.id"
        :to="`/product/${product.id}`"
        v-slot="{ navigate }"
        custom
      >
        <div class="product-card"
             @click="navigate"
        >
          <div class="product-img">
            <img :src="product.img" width="121" height="121">
          </div>

          <h4 class="product-title"> {{ product.title }} </h4>

          <div class="text-center">
            <product-controls :product="product"/>
          </div>
        </div>
      </router-link>
    </template>

    <p v-else>Товаров нет</p>
  </div>
</template>

<script>
import AppLoader from '@/components/ui/AppLoader'
import ProductControls from '@/components/product/ProductControls'

export default {
  props: ['products', 'isLoading'],
  components: { AppLoader, ProductControls }
}
</script>
