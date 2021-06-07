import store from '@/store'
import axios from '@/axios/product'

export default {
  namespaced: true,
  state() {
    return {
      categories: []
    }
  },
  getters: {
    categories(state) {
      return state.categories
    },
    categoryName: (state) => (type) => {
      return state.categories.find(category => category.type === type)?.title
    },
    selectOptions(state) {
      return state.categories.reduce((acc, category) => {
        acc[category.type] = category.title
        return acc
      }, {})
    }
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories
    },
    addCategory(state, category) {
      state.categories.push(category)
    },
    removeCategory(state, id) {
      const index = state.categories.findIndex(category => category.id === id)
      state.categories.splice(index, 1)
    }
  },
  actions: {
    async loadCategories({ commit }) {
      try {
        const { data } = await axios.get('/categories.json')

        if (data) {
          const categories = Object.keys(data).map(id => ({ ...data[id], id }))
          commit('setCategories', categories)
        }
      } catch (e) {
        store.dispatch('message/setMessage', {
          type: 'danger',
          value: `Ошибка: ${e.response.data.error.message}`
        })
      }
    },
    async createCategory({ commit }, category) {
      try {
        const token = store.getters['auth/token']
        const { data } = await axios.post(`/categories.json?auth=${token}`, category)

        commit('addCategory', {
          id: data.name,
          ...category
        })

        store.dispatch('message/setMessage', {
          type: 'primary',
          value: 'Категория успешно создана'
        })
      } catch (e) {
        store.dispatch('message/setMessage', {
          type: 'danger',
          value: `Ошибка: ${e.response.data.error.message}`
        })
      }
    },
    async removeCategory({ commit }, id) {
      try {
        const token = store.getters['auth/token']
        await axios.delete(`/categories/${id}.json?auth=${token}`)
        commit('removeCategory', id)

        store.dispatch('message/setMessage', {
          type: 'primary',
          value: 'Категория успешно удалена'
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
