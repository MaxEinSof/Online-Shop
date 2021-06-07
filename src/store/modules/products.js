import store from '@/store'
import axios from '@/axios/product'

export default {
  namespaced: true,
  state() {
    return {
      products: []
    }
  },
  getters: {
    products(state) {
      return [
        ...state.products.filter(product => product.inStock !== 0),
        ...state.products.filter(product => product.inStock === 0)
      ]
    },
    firstMissingProductsIndex(state) {
      for (let i = state.products.length - 1; i >= 0; i--) {
        if (state.products[i].inStock !== 0) {
          return ++i
        }
      }
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    addProduct(state, product) {
      state.products.splice(product.index, 0, product.data)
    },
    removeProduct(state, id) {
      const index = state.products.findIndex(product => product.id === id)
      if (index >= 0) {
        state.products.splice(index, 1)
      }
    },
    updateProduct(state, product) {
      const index = state.products.findIndex(item => item.id === product.id)
      if (index >= 0) {
        state.products[index] = product
      }
    }
  },
  actions: {
    async loadProducts({ commit }) {
      try {
        const { data } = await axios.get('/products.json')

        if (data) {
          const products = Object.keys(data).map(id => ({ ...data[id], id }))
          commit('setProducts', products)
        }
      } catch (e) {
        store.dispatch('message/setMessage', {
          type: 'danger',
          value: `Ошибка: ${e.response.data.error.message}`
        })
      }
    },
    async loadProductById(_, id) {
      try {
        const { data } = await axios.get(`/products/${id}.json`)
        return { ...data, id }
      } catch (e) {
        store.dispatch('message/setMessage', {
          type: 'danger',
          value: `Ошибка: ${e.response.data.error.message}`
        })
      }
    },
    async createProduct({ commit, getters }, product) {
      try {
        const token = store.getters['auth/token']
        const { data } = await axios.post(`/products.json?auth=${token}`, product)

        commit('addProduct', {
          data: {
            id: data.name,
            ...product
          },
          index: getters.firstMissingProductsIndex
        })

        store.dispatch('message/setMessage', {
          type: 'primary',
          value: 'Товар успешно создан'
        })
      } catch (e) {
        store.dispatch('message/setMessage', {
          type: 'danger',
          value: `Ошибка: ${e.response.data.error.message}`
        })
      }
    },
    async removeProduct({ commit }, id) {
      try {
        const token = store.getters['auth/token']
        await axios.delete(`/products/${id}.json?auth=${token}`)
        commit('removeProduct', id)

        store.dispatch('message/setMessage', {
          type: 'primary',
          value: 'Товар успешно удалён'
        })
      } catch (e) {
        store.dispatch('message/setMessage', {
          type: 'danger',
          value: `Ошибка: ${e.response.data.error.message}`
        })
      }
    },
    async updateProduct({ commit }, product) {
      try {
        const token = store.getters['auth/token']
        await axios.put(`/products/${product.id}.json?auth=${token}`, product)
        commit('updateProduct', product)

        store.dispatch('message/setMessage', {
          type: 'primary',
          value: 'Товар успешно обновлён'
        })
      } catch (e) {
        store.dispatch('message/setMessage', {
          type: 'danger',
          value: `Ошибка: ${e.response.data.error.message}`
        })
      }
    }
  }
}
