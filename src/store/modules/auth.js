import store from '@/store'
import axios from 'axios'
import getErrorMessage from '@/utils/get-error-message'

const TOKEN_KEY = 'jwt-token'

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY),
      emailError: null,
      passwordError: null
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    isAuthenticated(_, getters) {
      return !!getters.token
    },
    emailError(state) {
      return state.emailError
    },
    passwordError(state) {
      return state.passwordError
    },
    hasErrors(_, getters) {
      return !!getters.emailError || !!getters.passwordError
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    removeToken(state) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
    },
    setEmailError(state, error) {
      state.emailError = error
    },
    setPasswordError(state, error) {
      state.passwordError = error
    },
    clearErrors(state) {
      state.emailError = null
      state.passwordError = null
    }
  },
  actions: {
    async login({ commit, getters }, payload) {
      try {
        if (getters.hasErrors) {
          commit('clearErrors')
        }

        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`
        const { data } = await axios.post(url, {
          ...payload,
          returnSecureToken: true
        })

        commit('setToken', data.idToken)
      } catch (e) {
        const errorCode = e.response.data.error.message
        const errorMessage = getErrorMessage(errorCode)

        if (errorCode.toLowerCase().includes('email')) {
          commit('setEmailError', errorMessage)
        } else if (errorCode.toLowerCase().includes('password')) {
          commit('setPasswordError', errorMessage)
        }

        store.dispatch('message/setMessage', {
          type: 'danger',
          value: errorMessage
        })

        throw new Error()
      }
    }
  }
}
