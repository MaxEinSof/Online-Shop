export default {
  namespaced: true,
  state() {
    return {
      message: null,
      timeoutId: null
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
    setMessage({ state, commit }, message) {
      if (state.message) {
        commit('clearMessage')
        clearTimeout(state.timeoutId)
      }

      setTimeout(() => commit('setMessage', message), 0)
      state.timeoutId = setTimeout(() => commit('clearMessage'), 8000)
    }
  }
}
