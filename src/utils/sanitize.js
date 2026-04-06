const dangerousPattern = /[<>"'`]/g

export function sanitizeInput(value) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().replace(dangerousPattern, '')
}

export function sanitizeFormData(values) {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, sanitizeInput(value)]),
  )
}
