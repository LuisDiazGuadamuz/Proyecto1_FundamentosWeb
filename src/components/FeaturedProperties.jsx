import { useMemo } from 'react'
import { usePropertiesContext } from '../context/PropertiesContext'
import PropertyCard from './PropertyCard'

function FeaturedProperties() {
  const { properties } = usePropertiesContext()

  const featured = useMemo(() => {
    return properties.slice(0, 3)
  }, [properties])

  if (featured.length === 0) {
    return null
  }

  return (
    <section className="mt-12 space-y-6">
      <div>
        <h2 className="font-display text-3xl text-samara-charcoal">Propiedades destacadas</h2>
        <p className="mt-2 text-samara-ash">Selecciones premium para inversion inteligente.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedProperties
