import { computed, watch } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import store from '@/store'
import router from '@/router'

export default function useLoginValidation() {
  const MIN_PASSWORD_LENGTH = 6
  const MAX_SUBMIT_COUNT = 3

  const { handleSubmit, isSubmitting, submitCount } = useForm()

  const {
    value: email,
    errorMessage: emailValidationError,
    handleBlur: emailBlur
  } = useField('email',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите email')
      .email('Необходимо ввести корректный email')
  )

  const {
    value: password,
    errorMessage: passwordValidationError,
    handleBlur: passwordBlur
  } = useField('password',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите пароль')
      .min(MIN_PASSWORD_LENGTH, `Пароль не может быть меньше ${MIN_PASSWORD_LENGTH} символов`)
  )

  const isTooManyAttempts = computed(() => submitCount.value >= MAX_SUBMIT_COUNT)

  watch(isTooManyAttempts, value => {
    if (value) {
      setTimeout(() => submitCount.value = 0, 3000)
    }
  })

  const onSubmit = handleSubmit(async values => {
    try {
      await store.dispatch('auth/login', values)
      router.push({ name: 'Admin' })
    } catch (e) {
      store.dispatch('message/setMessage', {
        type: 'danger',
        value: `Ошибка: ${e.response.data.error.message}`
      })
    }
  })

  return {
    email,
    emailValidationError,
    emailBlur,
    password,
    passwordValidationError,
    passwordBlur,
    onSubmit,
    isSubmitting,
    isTooManyAttempts
  }
}
