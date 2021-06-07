import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

export default function useProductValidation(fn) {
  const { handleSubmit, isSubmitting } = useForm()

  const {
    value: title,
    errorMessage: titleError,
    handleBlur: titleBlur
  } = useField('title',
    yup
      .string()
      .trim()
      .required('Введите название товара')
  )

  const {
    value: img,
    errorMessage: imgError,
    handleBlur: imgBlur
  } = useField('img',
    yup
      .string()
      .trim()
      .required('Введите адрес изображения товара')
  )

  const {
    value: inStock,
    errorMessage: inStockError,
    handleBlur: inStockBlur
  } = useField('inStock',
    yup
      .number()
      .required('Введите количество товара')
      .typeError('Введите количество товара')
      .min(0, 'Количество товара не может быть меньше 0')
  )

  const {
    value: price,
    errorMessage: priceError,
    handleBlur: priceBlur
  } = useField('price',
    yup
      .number()
      .required('Введите цену товара')
      .typeError('Введите цену товара')
      .min(0, 'Цена товара не может быть меньше 0')
  )

  const {
    value: category,
    errorMessage: categoryError,
    handleBlur: categoryBlur
  } = useField('category',
    yup
      .string()
      .required('Выберите категорию товара')
  )

  const onSubmit = handleSubmit(fn)

  return {
    title,
    titleError,
    titleBlur,
    img,
    imgError,
    imgBlur,
    inStock,
    inStockError,
    inStockBlur,
    price,
    priceError,
    priceBlur,
    category,
    categoryError,
    categoryBlur,
    onSubmit,
    isSubmitting
  }
}
