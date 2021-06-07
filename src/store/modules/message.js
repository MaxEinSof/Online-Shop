export default {
  namespaced: true,
  state() {
    return {
      message: null
    }
  },
  getters: {
    message(state) {
      return state.message
    }
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = null
    }
  },
  actions: {
    setMessage({ commit }, message) {
      commit('setMessage', message)
      setTimeout(() => commit('clearMessage'), 8000)
    }
  }
}
