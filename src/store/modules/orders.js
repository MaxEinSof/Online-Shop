import store from '@/store'
import databaseAxios from '@/axios/database'

export default {
  namespaced: true,
  actions: {
    async createOrder() {
      const cart = store.getters['cart/cart']
      const products = store.getters['products/products']

      const order = {
        userId: store.getters['auth/user'].id,
        date: Date.now(),
        items: []
      }

      for (const [id, quantity] of Object.entries(cart)) {
        const product = products.find(product => product.id === id)

        order.items.push({
          name: product.title,
          price: product.price,
          quantity
        })

        const inStock = product.inStock - quantity

        store.commit('products/updateInStock', { id, inStock })

        databaseAxios.patch(`/products/${id}.json`, { inStock })
      }

      store.commit('cart/clearCart')

      await databaseAxios.post('/orders.json', order)
    }
  }
}
