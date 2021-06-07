import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

export default function useCategoryValidation(fn) {
  const { handleSubmit, isSubmitting } = useForm()

  const {
    value: title,
    errorMessage: titleError,
    handleBlur: titleBlur
  } = useField('title',
    yup
      .string()
      .trim()
      .required('Введите название категории')
  )

  const {
    value: type,
    errorMessage: typeError,
    handleBlur: typeBlur
  } = useField('type',
    yup
      .string()
      .trim()
      .required('Введите тип категории')
  )

  const onSubmit = handleSubmit(fn)

  return {
    title,
    titleError,
    titleBlur,
    type,
    typeError,
    typeBlur,
    onSubmit,
    isSubmitting
  }
}
