import store from '@/store'
import databaseAxios from '@/axios/database'

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
        const { data } = await databaseAxios.get('/categories.json')

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
        const { data } = await databaseAxios.post('/categories.json', category)

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
        await databaseAxios.delete(`/categories/${id}.json`)
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
