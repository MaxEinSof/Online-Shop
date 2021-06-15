<template>
  <form @submit.prevent="onSubmit">
    <slot name="title"/>

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
    >Войти</button>

    <slot
      name="actions"
      :actionsProps="{email, password, isSubmitting, isTooManyAttempts}"
    />

    <span
      class="text-danger"
      v-if="isTooManyAttempts"
    >Вы слишком часто пытаетесь войти в систему. Попробуйте позже.</span>
  </form>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AppInput from '@/components/ui/AppInput'
import useSignInValidation from '@/use/sign-in-validation'

export default {
  props: {
    submitCallback: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    const invalidEmailError = computed(() => store.getters['auth/emailError'])
    const invalidPasswordError = computed(() => store.getters['auth/passwordError'])

    return {
      ...useSignInValidation(props.submitCallback),
      invalidEmailError,
      invalidPasswordError
    }
  },
  components: { AppInput }
}
</script>
