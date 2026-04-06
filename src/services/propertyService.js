const API_URL = `${import.meta.env.BASE_URL}properties.json`

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
    return data.properties ?? []
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
