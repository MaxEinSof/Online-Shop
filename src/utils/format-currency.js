const formatter = new Intl.NumberFormat('ru-RU', {
  currency: 'RUB',
  style: 'currency'
})

export default function formatCurrency(value) {
  return formatter.format(value)
}
