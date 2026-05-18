import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { createProperty, deleteProperty, getInquiryStats, getProperties, updateProperty } from '../services/graphqlService'
import { formatCurrency } from '../utils/format'

const initialFormState = {
  name: '',
  location: '',
  price: 0,
  description: '',
  beds: 0,
  baths: 0,
  area: 0,
  type: '',
  features: '',
  images: '',
}

function AdminDashboardPage() {
  const { token, user, signOut } = useAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({ totalInquiries: 0, unreadInquiries: 0, totalProperties: 0 })
  const [form, setForm] = useState(initialFormState)
  const [saving, setSaving] = useState(false)
  const [editingPropertyId, setEditingPropertyId] = useState(null)

  const loadProperties = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await getProperties()
      setProperties(data)
    } catch (fetchError) {
      setError(fetchError.message)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const data = await getInquiryStats(token)
      setStats(data)
    } catch (fetchError) {
      setError(fetchError.message)
    }
  }

  useEffect(() => {
    loadProperties()
    loadStats()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setEditingPropertyId(null)
    setForm(initialFormState)
    setError('')
  }

  const handleEdit = (property) => {
    setEditingPropertyId(property.id)
    setForm({
      name: property.name || '',
      location: property.location || '',
      price: property.price || 0,
      description: property.description || '',
      beds: property.beds || 0,
      baths: property.baths || 0,
      area: property.area || 0,
      type: property.type || '',
      features: (property.features || []).join(', '),
      images: (property.images || []).join(', '),
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')

    try {
      const input = {
        name: form.name,
        location: form.location,
        price: Number(form.price),
        description: form.description,
        beds: Number(form.beds),
        baths: Number(form.baths),
        area: Number(form.area),
        type: form.type,
        features: form.features.split(',').map((item) => item.trim()).filter(Boolean),
        images: form.images.split(',').map((item) => item.trim()).filter(Boolean),
      }

      if (editingPropertyId) {
        await updateProperty(editingPropertyId, input, token)
      } else {
        await createProperty(input, token)
      }

      resetForm()
      await loadProperties()
      await loadStats()
    } catch (saveError) {
      setError(saveError.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta propiedad?')) {
      return
    }

    try {
      await deleteProperty(id, token)
      if (editingPropertyId === id) {
        resetForm()
      }
      await loadProperties()
      await loadStats()
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  const featureSummary = useMemo(() => {
    if (!properties.length) return 'No hay propiedades registradas.'
    return `${properties.length} propiedades disponibles.`
  }, [properties])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-samara-stone/70 bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-samara-ash">Panel de administración</p>
          <h1 className="mt-2 text-3xl font-display text-samara-charcoal">Bienvenido, {user?.email}</h1>
          <p className="mt-2 text-sm text-samara-ash">{featureSummary}</p>
        </div>
        <button
          onClick={signOut}
          className="rounded-full border border-samara-charcoal px-5 py-3 text-sm font-semibold text-samara-charcoal transition hover:bg-samara-charcoal hover:text-white"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-samara-stone/70 bg-white p-5 text-center shadow-card">
          <p className="text-sm uppercase tracking-wide text-samara-ash">Propiedades</p>
          <p className="mt-3 text-3xl font-semibold text-samara-charcoal">{stats.totalProperties}</p>
        </div>
        <div className="rounded-3xl border border-samara-stone/70 bg-white p-5 text-center shadow-card">
          <p className="text-sm uppercase tracking-wide text-samara-ash">Consultas</p>
          <p className="mt-3 text-3xl font-semibold text-samara-charcoal">{stats.totalInquiries}</p>
        </div>
        <div className="rounded-3xl border border-samara-stone/70 bg-white p-5 text-center shadow-card">
          <p className="text-sm uppercase tracking-wide text-samara-ash">Consultas sin leer</p>
          <p className="mt-3 text-3xl font-semibold text-samara-charcoal">{stats.unreadInquiries}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-samara-ash">Gestiona las consultas entrantes y mantén el catálogo actualizado desde aquí.</p>
        <a
          href="/admin/inquiries"
          className="inline-flex rounded-full bg-samara-charcoal px-5 py-3 text-sm font-semibold text-white transition hover:bg-samara-gold hover:text-samara-charcoal"
        >
          Ver consultas
        </a>
      </div>

      {error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[0.9fr_0.7fr]">
        <section className="rounded-3xl border border-samara-stone/70 bg-white p-6 shadow-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-samara-charcoal">
                {editingPropertyId ? 'Editar propiedad' : 'Registrar nueva propiedad'}
              </h2>
              <p className="mt-1 text-sm text-samara-ash">
                {editingPropertyId
                  ? 'Modifica los datos y guarda los cambios.'
                  : 'Registra una nueva propiedad para su publicación.'}
              </p>
            </div>
            {editingPropertyId ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-samara-stone px-4 py-2 text-sm font-semibold text-samara-charcoal transition hover:bg-samara-stone/50"
              >
                Nuevo registro
              </button>
            ) : null}
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-samara-ash">Nombre</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-samara-stone/70 bg-samara-ivory px-4 py-3 text-samara-charcoal"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-samara-ash">Ubicación</span>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-samara-stone/70 bg-samara-ivory px-4 py-3 text-samara-charcoal"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-samara-ash">Precio</span>
                <input
                  name="price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-samara-stone/70 bg-samara-ivory px-4 py-3 text-samara-charcoal"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-samara-ash">Tipo</span>
                <input
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-samara-stone/70 bg-samara-ivory px-4 py-3 text-samara-charcoal"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block">
                <span className="text-sm font-medium text-samara-ash">Habitaciones</span>
                <input
                  name="beds"
                  type="number"
                  min="0"
                  value={form.beds}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-samara-stone/70 bg-samara-ivory px-4 py-3 text-samara-charcoal"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-samara-ash">Baños</span>
                <input
                  name="baths"
                  type="number"
                  min="0"
                  value={form.baths}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-samara-stone/70 bg-samara-ivory px-4 py-3 text-samara-charcoal"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-samara-ash">Área m²</span>
                <input
                  name="area"
                  type="number"
                  min="0"
                  value={form.area}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-samara-stone/70 bg-samara-ivory px-4 py-3 text-samara-charcoal"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-samara-ash">Descripción</span>
              <textarea
                name="description"
                rows="4"
                value={form.description}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-samara-stone/70 bg-samara-ivory px-4 py-3 text-samara-charcoal"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-samara-ash">Características (separadas por coma)</span>
              <input
                name="features"
                value={form.features}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-samara-stone/70 bg-samara-ivory px-4 py-3 text-samara-charcoal"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-samara-ash">URLs de imágenes (separadas por coma)</span>
              <input
                name="images"
                value={form.images}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-samara-stone/70 bg-samara-ivory px-4 py-3 text-samara-charcoal"
              />
            </label>

            <button
              type="submit"
              disabled={saving}
              className="mt-2 w-full rounded-full bg-samara-charcoal px-6 py-3 text-sm font-bold text-white transition hover:bg-samara-gold hover:text-samara-charcoal disabled:opacity-60"
            >
              {saving ? 'Guardando...' : editingPropertyId ? 'Actualizar propiedad' : 'Guardar propiedad'}
            </button>
          </form>
        </section>

        <section className="rounded-3xl border border-samara-stone/70 bg-white p-6 shadow-card">
          <h2 className="mb-4 text-xl font-semibold text-samara-charcoal">Propiedades registradas</h2>

          {loading ? (
            <p className="text-samara-ash">Cargando propiedades...</p>
          ) : properties.length === 0 ? (
            <p className="text-samara-ash">No hay propiedades disponibles.</p>
          ) : (
            <div className="space-y-4">
              {properties.map((property) => (
                <article key={property.id} className="rounded-3xl border border-samara-stone/70 p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-samara-charcoal">{property.name}</h3>
                      <p className="text-sm text-samara-ash">{property.location}</p>
                      <p className="mt-2 text-samara-gold">{formatCurrency(property.price)}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(property)}
                        className="rounded-full border border-samara-charcoal px-4 py-2 text-sm font-semibold text-samara-charcoal transition hover:bg-samara-charcoal hover:text-white"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(property.id)}
                        className="rounded-full border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default AdminDashboardPage
