import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import PropertyGallery from '../components/PropertyGallery'
import { getPropertyById } from '../services/propertyService'
import { formatCurrency } from '../utils/format'

function PropertyDetailPage() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadProperty() {
      setIsLoading(true)
      setError('')

      try {
        const response = await getPropertyById(id, controller.signal)
        setProperty(response)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadProperty()

    return () => controller.abort()
  }, [id])

  if (isLoading) {
    return <LoadingState label="Cargando detalle de propiedad..." />
  }

  if (error) {
    return <ErrorState message={error} />
  }

  if (!property) {
    return <ErrorState message="No fue posible cargar la propiedad seleccionada." />
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <PropertyGallery images={property.images} title={property.name} />

      <aside className="rounded-2xl border border-samara-stone/70 bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-wide text-samara-ash">{property.location}</p>
        <h1 className="mt-2 font-display text-4xl leading-tight text-samara-charcoal">{property.name}</h1>
        <p className="mt-4 text-2xl font-semibold text-samara-gold">{formatCurrency(property.price)}</p>
        <p className="mt-5 text-samara-ash">{property.description}</p>

        <ul className="mt-6 grid grid-cols-2 gap-4 text-sm text-samara-ash">
          <li className="rounded-xl border border-samara-stone/70 bg-samara-ivory p-3">
            Habitaciones: <strong>{property.beds}</strong>
          </li>
          <li className="rounded-xl border border-samara-stone/70 bg-samara-ivory p-3">
            Banos: <strong>{property.baths}</strong>
          </li>
          <li className="rounded-xl border border-samara-stone/70 bg-samara-ivory p-3">
            Area: <strong>{property.area} m2</strong>
          </li>
          <li className="rounded-xl border border-samara-stone/70 bg-samara-ivory p-3">
            Tipo: <strong>{property.type}</strong>
          </li>
        </ul>

        <Link
          to="/contact"
          className="mt-8 inline-flex rounded-full bg-samara-charcoal px-6 py-3 text-sm font-bold text-white transition hover:bg-samara-gold hover:text-samara-charcoal"
        >
          Contactar asesor
        </Link>
      </aside>
    </div>
  )
}

export default PropertyDetailPage
