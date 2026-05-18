import { Link } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'
import { formatCurrency } from '../utils/format'

function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites()

  if (favorites.length === 0) {
    return (
      <section className="mx-auto w-full max-w-5xl rounded-3xl border border-samara-stone/70 bg-white p-8 shadow-card">
        <h1 className="text-3xl font-display text-samara-charcoal">Favoritos</h1>
        <p className="mt-4 text-samara-ash">No tienes propiedades guardadas. Visita alguna propiedad para agregarla a tus favoritos.</p>
        <Link
          to="/properties"
          className="mt-6 inline-flex rounded-full bg-samara-charcoal px-6 py-3 text-sm font-bold text-white transition hover:bg-samara-gold hover:text-samara-charcoal"
        >
          Ver catálogo
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-5xl space-y-6 rounded-3xl border border-samara-stone/70 bg-white p-8 shadow-card">
      <header>
        <h1 className="text-3xl font-display text-samara-charcoal">Mis favoritos</h1>
        <p className="mt-2 text-samara-ash">Las propiedades que guardaste para revisar después.</p>
      </header>

      <div className="grid gap-6">
        {favorites.map((property) => (
          <article key={property.id} className="rounded-3xl border border-samara-stone/70 bg-samara-ivory p-6 shadow-card">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-samara-charcoal">{property.name}</h2>
                <p className="mt-1 text-sm text-samara-ash">{property.location}</p>
                <p className="mt-3 text-lg font-semibold text-samara-gold">{formatCurrency(property.price)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  to={`/properties/${property.id}`}
                  className="rounded-full border border-samara-charcoal px-4 py-2 text-sm font-semibold text-samara-charcoal transition hover:bg-samara-charcoal hover:text-white"
                >
                  Ver detalle
                </Link>
                <button
                  type="button"
                  onClick={() => removeFavorite(property.id)}
                  className="rounded-full border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FavoritesPage
