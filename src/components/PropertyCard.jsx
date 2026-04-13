import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/format'

function PropertyCard({ property }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-samara-stone/70 bg-white shadow-card transition hover:-translate-y-1">
      <div className="overflow-hidden">
        <img
          src={property.images[0]}
          alt={`Imagen de ${property.name}`}
          className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="space-y-3 p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-samara-ash">{property.location}</p>
        <h3 className="font-display text-2xl text-samara-charcoal">{property.name}</h3>
        <p className="text-lg font-semibold text-samara-gold">{formatCurrency(property.price)}</p>
        <Link
          to={`/properties/${property.id}`}
          className="inline-flex rounded-full border border-samara-charcoal px-4 py-2 text-sm font-semibold text-samara-charcoal transition hover:bg-samara-charcoal hover:text-white"
        >
          Ver detalle
        </Link>
      </div>
    </article>
  )
}

export default PropertyCard
