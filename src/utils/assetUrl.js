export function resolveAssetUrl(url) {
  if (!url || typeof url !== 'string') {
    return url
  }

  if (/^https?:\/\//i.test(url)) {
    return url
  }

  const normalizedPath = url.replace(/^\/+/, '')
  return `${import.meta.env.BASE_URL}${normalizedPath}`
}
