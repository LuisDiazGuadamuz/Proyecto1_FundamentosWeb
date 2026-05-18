import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { deleteInquiry, getInquiries, updateInquiryStatus } from '../services/graphqlService'

function AdminInquiriesPage() {
  const { token, signOut } = useAuth()
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadInquiries = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await getInquiries(token)
      setInquiries(data)
    } catch (fetchError) {
      setError(fetchError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInquiries()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Eliminar consulta?')) {
      return
    }

    try {
      await deleteInquiry(id, token)
      await loadInquiries()
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  const handleToggleStatus = async (inquiry) => {
    try {
      await updateInquiryStatus(inquiry.id, inquiry.status === 'NEW' ? 'READ' : 'NEW', token)
      await loadInquiries()
    } catch (statusError) {
      setError(statusError.message)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-samara-stone/70 bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-samara-ash">Consultas de clientes</p>
          <h1 className="mt-2 text-3xl font-display text-samara-charcoal">Lista de consultas</h1>
          <p className="mt-2 text-sm text-samara-ash">Administra los mensajes enviados desde el formulario de contacto.</p>
        </div>
        <button
          onClick={signOut}
          className="rounded-full border border-samara-charcoal px-5 py-3 text-sm font-semibold text-samara-charcoal transition hover:bg-samara-charcoal hover:text-white"
        >
          Cerrar sesión
        </button>
      </div>

      {error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
      ) : null}

      <section className="rounded-3xl border border-samara-stone/70 bg-white p-6 shadow-card">
        {loading ? (
          <p className="text-samara-ash">Cargando consultas...</p>
        ) : inquiries.length === 0 ? (
          <p className="text-samara-ash">No hay consultas nuevas.</p>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <article key={inquiry.id} className="rounded-3xl border border-samara-stone/70 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-samara-ash">{inquiry.status === 'NEW' ? 'Nueva' : 'Leída'}</p>
                    <h2 className="mt-2 text-xl font-semibold text-samara-charcoal">{inquiry.name}</h2>
                    <p className="text-sm text-samara-ash">{inquiry.email}</p>
                    {inquiry.propertyName ? (
                      <p className="mt-2 text-sm text-samara-charcoal">Interés en: {inquiry.propertyName}</p>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(inquiry)}
                      className="rounded-full border border-samara-charcoal px-4 py-2 text-sm font-semibold text-samara-charcoal transition hover:bg-samara-charcoal hover:text-white"
                    >
                      {inquiry.status === 'NEW' ? 'Marcar como leída' : 'Marcar como nueva'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(inquiry.id)}
                      className="rounded-full border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                <p className="mt-4 text-samara-ash">{inquiry.message}</p>
                <p className="mt-3 text-xs uppercase tracking-wide text-samara-stone">Enviado {new Date(inquiry.createdAt).toLocaleString()}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default AdminInquiriesPage
