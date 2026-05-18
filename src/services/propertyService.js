const API_URL = import.meta.env.VITE_API_URL || '/graphql'

function resolveAssetUrl(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') {
    return imageUrl
  }

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

async function executeGraphQL(query, variables = {}, signal) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      signal,
    })

    if (!response.ok) {
      throw new Error('No se pudo conectar con la API GraphQL.')
    }

    const result = await response.json()
    if (result.errors?.length) {
      throw new Error(result.errors[0].message)
    }

    return result.data
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error
    }
    throw new Error(error.message || 'Error de red al consultar propiedades.')
  }
}

export async function getProperties(signal) {
  const query = `
    query GetProperties {
      properties {
        id
        name
        description
        location
        price
        images
        beds
        baths
        area
        type
        features
        createdAt
      }
    }
  `

  const data = await executeGraphQL(query, {}, signal)
  const properties = data.properties ?? []
  return properties.map(normalizeProperty)
}

export async function getPropertyById(id, signal) {
  const query = `
    query GetProperty($id: ID!) {
      property(id: $id) {
        id
        name
        description
        location
        price
        images
        beds
        baths
        area
        type
        features
        createdAt
      }
    }
  `

  const data = await executeGraphQL(query, { id }, signal)

  if (!data.property) {
    throw new Error('Propiedad no encontrada.')
  }

  return normalizeProperty(data.property)
}
