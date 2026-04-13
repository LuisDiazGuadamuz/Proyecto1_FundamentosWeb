const API_URL = `${import.meta.env.BASE_URL}properties.json`

function resolveAssetUrl(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') {
    return imageUrl
  }

  // Keep external URLs unchanged.
  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl
  }

  const normalizedPath = imageUrl.replace(/^\/+/, '')
  return `${import.meta.env.BASE_URL}${normalizedPath}`
}

function normalizeProperty(property) {
  if (!property || !Array.isArray(property.images)) {
    return property
  }

  return {
    ...property,
    images: property.images.map(resolveAssetUrl),
  }
}

export async function getProperties(signal) {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal,
    })

    if (!response.ok) {
      throw new Error('No se pudieron obtener las propiedades.')
    }

    const data = await response.json()
    const properties = data.properties ?? []
    return properties.map(normalizeProperty)
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error
    }

    throw new Error(error.message || 'Error de red al consultar propiedades.')
  }
}

export async function getPropertyById(id, signal) {
  const properties = await getProperties(signal)
  const property = properties.find((item) => String(item.id) === String(id))

  if (!property) {
    throw new Error('Propiedad no encontrada.')
  }

  return property
}
