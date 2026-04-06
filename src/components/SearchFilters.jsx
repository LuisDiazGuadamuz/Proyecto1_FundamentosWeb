import { buildPriceLabel } from '../utils/format'

const maxPriceOptions = [
  { value: 'all', min: 0, max: 0 },
  { value: '150000', min: 0, max: 150000 },
  { value: '300000', min: 150001, max: 300000 },
  { value: '500000', min: 300001, max: 500000 },
]

function SearchFilters({
  search,
  onSearch,
  locations,
  location,
  onLocationChange,
  maxPrice,
  onMaxPriceChange,
}) {
  return (
    <section className="rounded-2xl border border-samara-stone/70 bg-white p-5 shadow-card">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-samara-ash">Buscar por nombre</span>
          <input
            type="search"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Ej. Villa Horizonte"
            className="w-full rounded-xl border border-samara-stone px-4 py-2 outline-none transition focus:border-samara-gold"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-samara-ash">Ubicacion</span>
          <select
            value={location}
            onChange={(event) => onLocationChange(event.target.value)}
            className="w-full rounded-xl border border-samara-stone px-4 py-2 outline-none transition focus:border-samara-gold"
          >
            {locations.map((option) => (
              <option key={option} value={option}>
                {option === 'all' ? 'Todas las ubicaciones' : option}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-samara-ash">Rango de precio</span>
          <select
            value={maxPrice}
            onChange={(event) => onMaxPriceChange(event.target.value)}
            className="w-full rounded-xl border border-samara-stone px-4 py-2 outline-none transition focus:border-samara-gold"
          >
            {maxPriceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {buildPriceLabel(option.min, option.max)}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  )
}

export default SearchFilters
