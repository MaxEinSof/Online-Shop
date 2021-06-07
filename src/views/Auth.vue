<template>
  <app-page title="Войти в систему">
    <form @submit.prevent="onSubmit">
      <app-input
        type="email"
        id="email"
        label="Почта"
        v-model="email"
        :error="emailValidationError || invalidEmailError"
        :blur="emailBlur"
      />

      <app-input
        type="password"
        id="password"
        label="Пароль"
        v-model="password"
        :error="passwordValidationError || invalidPasswordError"
        :blur="passwordBlur"
      />

      <button
        type="submit"
        class="btn primary"
        :disabled="!email || !password || isSubmitting || isTooManyAttempts"
      >Войти
      </button>

      <span
        class="text-danger"
        v-if="isTooManyAttempts"
      >Вы слишком часто пытаетесь войти в систему. Попробуйте позже.</span>
    </form>
  </app-page>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import AppPage from '@/components/ui/AppPage'
import AppInput from '@/components/ui/AppInput'
import useLoginValidation from '@/use/login-validation'
import getErrorMessage from '@/utils/get-error-message'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()

    if (route.query.message) {
      store.dispatch('message/setMessage', {
        type: 'warning',
        value: getErrorMessage(route.query.message)
      })
    }

    const invalidEmailError = computed(() => store.getters['auth/emailError'])
    const invalidPasswordError = computed(() => store.getters['auth/passwordError'])

    return {
      ...useLoginValidation(),
      invalidEmailError,
      invalidPasswordError
    }
  },
  components: { AppPage, AppInput }
}
</script>
