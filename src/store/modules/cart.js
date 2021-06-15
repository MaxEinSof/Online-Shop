export default {
  namespaced: true,
  state() {
    return {
      cart: JSON.parse(localStorage.getItem('cart')) ?? {}
    }
  },
  getters: {
    cart(state) {
      return state.cart
    },
    productQuantity: (state) => (id) => {
      return state.cart[id]
    },
    totalQuantity(state) {
      return Object.values(state.cart)
        .reduce((acc, quantity) => {
          acc += quantity
          return acc
        }, 0)
    }
  },
  mutations: {
    addProduct(state, product) {
      if (!state.cart[product.id]) {
        state.cart[product.id] = 1
      } else if (state.cart[product.id] < product.inStock) {
        state.cart[product.id]++
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeProduct(state, product) {
      if (state.cart[product.id] > 1) {
        state.cart[product.id]--
      } else {
        delete state.cart[product.id]
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clearCart(state) {
      state.cart = {}
      localStorage.removeItem('cart')
    }
  }
}
