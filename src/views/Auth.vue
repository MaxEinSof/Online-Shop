<template>
  <app-page title="Войти в систему">
    <auth-form :submitCallback="submitCallback"/>
  </app-page>
</template>

<script>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import AppPage from '@/components/ui/AppPage'
import AuthForm from '@/components/auth/AuthForm'
import getErrorMessage from '@/utils/get-error-message'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    if (route.query.message) {
      setMessage(route.query.message)
    }

    const routeQueryMessage = computed(() => route.query.message)

    watch(routeQueryMessage, message => {
      if (message) {
        setMessage(message)
      }
    })

    function setMessage(message) {
      store.dispatch('message/setMessage', {
        type: 'warning',
        value: getErrorMessage(message)
      })
    }

    async function submitCallback(values) {
      try {
        await store.dispatch('auth/signIn', values)
        router.push({ name: 'Admin' })
      } catch (e) {
      }
    }

    return {
      submitCallback
    }
  },
  components: { AppPage, AuthForm }
}
</script>
