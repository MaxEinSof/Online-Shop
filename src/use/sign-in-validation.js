import { computed, watch } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

export default function useSignInValidation(submitCallback) {
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

  const onSubmit = handleSubmit(submitCallback)

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
