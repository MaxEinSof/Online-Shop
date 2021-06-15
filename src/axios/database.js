import axios from 'axios'
import router from '@/router'
import store from '@/store'

const databaseAxios = axios.create({
  baseURL: process.env.VUE_APP_DATABASE_URL
})

databaseAxios.defaults.params = {}

databaseAxios.interceptors.request.use(async config => {
  if (!store.getters['auth/isAuthenticated']) {
    return config
  }

  if (store.getters['auth/isExpired']) {
    await store.dispatch('auth/refresh')
  }

  config.params['auth'] = store.getters['auth/token']

  return config
})

databaseAxios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    store.commit('auth/removeToken')
    router.push('/auth?message=auth')
  }

  return Promise.reject(error)
})

export default databaseAxios
