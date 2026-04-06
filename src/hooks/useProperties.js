import { useEffect, useMemo, useState } from 'react'
import { getProperties } from '../services/propertyService'
import { sanitizeInput } from '../utils/sanitize'

export function useProperties() {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('all')
  const [maxPrice, setMaxPrice] = useState('all')

  useEffect(() => {
    const controller = new AbortController()

    async function loadProperties() {
      setIsLoading(true)
      setError('')

      try {
        const data = await getProperties(controller.signal)
        setProperties(data)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadProperties()

    return () => controller.abort()
  }, [])

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const byName = property.name
        .toLowerCase()
        .includes(sanitizeInput(search).toLowerCase())

      const byLocation =
        location === 'all' ||
        property.location.toLowerCase() === location.toLowerCase()

      const byPrice = maxPrice === 'all' || property.price <= Number(maxPrice)

      return byName && byLocation && byPrice
    })
  }, [properties, search, location, maxPrice])

  const locations = useMemo(() => {
    return ['all', ...new Set(properties.map((property) => property.location))]
  }, [properties])

  return {
    properties,
    filteredProperties,
    locations,
    isLoading,
    error,
    search,
    setSearch,
    location,
    setLocation,
    maxPrice,
    setMaxPrice,
  }
}
