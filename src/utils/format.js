export function formatCurrency(value) {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function buildPriceLabel(minPrice, maxPrice) {
  if (minPrice && maxPrice) {
    return `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`
  }

  if (minPrice) {
    return `Desde ${formatCurrency(minPrice)}`
  }

  if (maxPrice) {
    return `Hasta ${formatCurrency(maxPrice)}`
  }

  return 'Todos los precios'
}
