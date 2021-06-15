import store from '@/store'
import axios from 'axios'
import databaseAxios from '@/axios/database'
import getErrorMessage from '@/utils/get-error-message'

const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USER_KEY = 'shop-user'

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY),
      refreshToken: localStorage.getItem(REFRESH_KEY),
      expiresDate: new Date(localStorage.getItem(EXPIRES_KEY)),
      user: JSON.parse(localStorage.getItem(USER_KEY)) ?? {},
      emailError: null,
      passwordError: null
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    isAuthenticated(_, getters) {
      return !!getters.token && !getters.isExpired
    },
    isExpired(state) {
      return new Date() >= state.expiresDate
    },
    isAdmin(state) {
      return state.user.role === 'admin'
    },
    isUser(state) {
      return state.user.role === 'user'
    },
    user(state) {
      return state.user
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
    setUser(state, user) {
      state.user = user
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    },
    setToken(state, { idToken, refreshToken, expiresIn = '3600' }) {
      const expiresDate = new Date(new Date().getTime() + Number(expiresIn) * 1000)
      state.token = idToken
      state.refreshToken = refreshToken
      state.expiresDate = expiresDate
      localStorage.setItem(TOKEN_KEY, idToken)
      localStorage.setItem(REFRESH_KEY, refreshToken)
      localStorage.setItem(EXPIRES_KEY, expiresDate.toString())
    },
    removeToken(state) {
      state.token = null
      state.refreshToken = null
      state.expiresDate = null
      state.user = {}
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(REFRESH_KEY)
      localStorage.removeItem(EXPIRES_KEY)
      localStorage.removeItem(USER_KEY)
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
    async signUp({ commit, dispatch }, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_API_KEY}`
        const { data } = await axios.post(url, {
          ...payload,
          returnSecureToken: true
        })

        commit('setToken', data)
        await dispatch('createUser', data)

        store.dispatch('message/setMessage', {
          type: 'primary',
          value: `Аккаунт ${data.email} создан`
        })
      } catch (e) {
        dispatch('handleAuthError', e)
      }
    },
    async createUser({ commit }, { localId, email }) {
      try {
        const { data } = await databaseAxios.put(`/users/${localId}.json`, {
          name: email,
          role: 'user'
        })

        commit('setUser', { ...data, id: localId })
      } catch (e) {
      }
    },
    async signIn({ getters, commit, dispatch }, payload) {
      try {
        if (getters.hasErrors) {
          commit('clearErrors')
        }

        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`
        const { data } = await axios.post(url, {
          ...payload,
          returnSecureToken: true
        })

        commit('setToken', data)
        await dispatch('getUser', data.localId)
      } catch (e) {
        dispatch('handleAuthError', e)
        throw new Error()
      }
    },
    async getUser({ commit, dispatch }, id) {
      try {
        const { data } = await databaseAxios.get(`/users/${id}.json`)
        commit('setUser', { ...data, id })
      } catch (e) {
      }
    },
    async refresh({ state, commit }) {
      try {
        const { data } = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.VUE_APP_API_KEY}`, {
          grant_type: 'refresh_token',
          refresh_token: state.refreshToken
        })

        commit('setToken', {
          idToken: data.id_token,
          refreshToken: data.refresh_token,
          expiresIn: data.expires_in
        })
      } catch (e) {
      }
    },
    handleAuthError({ commit }, error) {
      const errorCode = error.response.data.error.message
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
    }
  }
}
