const rub = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
})

const plain = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 0,
})

export function formatRub(value: number): string {
  return rub.format(value)
}

export function formatNumber(value: number): string {
  return plain.format(value)
}
