<template>
  <app-page title="Войти в систему">
    <auth-form :submitCallback="submitCallback"/>
  </app-page>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AppPage from '@/components/ui/AppPage'
import AuthForm from '@/components/auth/AuthForm'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

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
