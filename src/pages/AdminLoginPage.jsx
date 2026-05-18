import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [localError, setLocalError] = useState('')
  const { signIn, error, setError, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin'

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLocalError('')
    setError('')
    setSubmitting(true)

    try {
      await signIn(email, password)
      navigate(from, { replace: true })
    } catch (signInError) {
      setLocalError(signInError.message || 'No se pudo iniciar sesión.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-samara-stone/70 bg-white p-8 shadow-card">
      <h1 className="mb-4 text-3xl font-display text-samara-charcoal">Administración</h1>
      <p className="mb-6 text-samara-ash">Inicia sesión con tu cuenta de administrador.</p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-sm font-medium text-samara-charcoal">Correo electrónico</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-samara-stone/70 bg-samara-ivory px-4 py-3 text-samara-charcoal focus:outline-none focus:ring-2 focus:ring-samara-gold"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-samara-charcoal">Contraseña</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-samara-stone/70 bg-samara-ivory px-4 py-3 text-samara-charcoal focus:outline-none focus:ring-2 focus:ring-samara-gold"
          />
        </label>

        {(localError || error) && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {localError || error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-samara-charcoal px-6 py-3 text-sm font-bold text-white transition hover:bg-samara-gold hover:text-samara-charcoal disabled:opacity-60"
        >
          {submitting ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}

export default AdminLoginPage
