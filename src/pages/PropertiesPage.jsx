import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import PropertyCard from '../components/PropertyCard'
import SearchFilters from '../components/SearchFilters'
import { usePropertiesContext } from '../context/PropertiesContext'

function PropertiesPage() {
  const {
    filteredProperties,
    locations,
    search,
    setSearch,
    location,
    setLocation,
    maxPrice,
    setMaxPrice,
    isLoading,
    error,
  } = usePropertiesContext()

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-4xl text-samara-charcoal">Catalogo de propiedades</h1>
        <p className="text-samara-ash">Explora propiedades en venta con filtros inteligentes.</p>
      </header>

      <SearchFilters
        search={search}
        onSearch={setSearch}
        locations={locations}
        location={location}
        onLocationChange={setLocation}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
      />

      {isLoading ? <LoadingState /> : null}
      {!isLoading && error ? <ErrorState message={error} /> : null}

      {!isLoading && !error ? (
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}

          {filteredProperties.length === 0 ? (
            <div className="sm:col-span-2 xl:col-span-3 rounded-2xl border border-samara-stone/70 bg-white p-8 text-center text-samara-ash shadow-card">
              No se encontraron propiedades con los filtros seleccionados.
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  )
}

export default PropertiesPage
