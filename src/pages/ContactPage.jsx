import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { sanitizeFormData } from '../utils/sanitize'
import { createInquiry } from '../services/graphqlService'

const initialForm = {
  name: '',
  email: '',
  message: '',
}

function ContactPage() {
  const [searchParams] = useSearchParams()
  const [formValues, setFormValues] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const propertyName = searchParams.get('propertyName') || ''

  function validate(values) {
    const currentErrors = {}

    if (!values.name || values.name.length < 3) {
      currentErrors.name = 'Ingresa un nombre valido con al menos 3 caracteres.'
    }

    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      currentErrors.email = 'Ingresa un correo electronico valido.'
    }

    if (!values.message || values.message.length < 10) {
      currentErrors.message = 'El mensaje debe tener al menos 10 caracteres.'
    }

    return currentErrors
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('idle')

    const sanitizedValues = sanitizeFormData(formValues)
    const validationErrors = validate(sanitizedValues)

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setStatus('error')
      return
    }

    try {
      await createInquiry({
        ...sanitizedValues,
        propertyName: propertyName || null,
      })
      setStatus('success')
      setFormValues(initialForm)
    } catch (submissionError) {
      setStatus('error')
      setErrors({ submit: submissionError.message })
    }
  }

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6 rounded-2xl border border-samara-stone/70 bg-white p-6 shadow-card sm:p-8">
      <header>
        <h1 className="font-display text-4xl text-samara-charcoal">Contactenos</h1>
        <p className="mt-2 text-samara-ash">Nuestro equipo te asesorara para concretar tu compra ideal.</p>
      </header>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        {propertyName ? (
          <div className="rounded-2xl border border-samara-stone/70 bg-samara-ivory p-4 text-sm text-samara-charcoal">
            Estoy interesado en la propiedad: <strong>{propertyName}</strong>
          </div>
        ) : null}

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-samara-ash">Nombre</span>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-samara-stone px-4 py-3 outline-none transition focus:border-samara-gold"
            autoComplete="name"
          />
          {errors.name ? <p className="text-sm text-red-600">{errors.name}</p> : null}
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-samara-ash">Email</span>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-samara-stone px-4 py-3 outline-none transition focus:border-samara-gold"
            autoComplete="email"
          />
          {errors.email ? <p className="text-sm text-red-600">{errors.email}</p> : null}
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-samara-ash">Mensaje</span>
          <textarea
            name="message"
            value={formValues.message}
            onChange={handleChange}
            rows="5"
            className="w-full rounded-xl border border-samara-stone px-4 py-3 outline-none transition focus:border-samara-gold"
          />
          {errors.message ? <p className="text-sm text-red-600">{errors.message}</p> : null}
        </label>

        <button
          type="submit"
          className="inline-flex rounded-full bg-samara-charcoal px-7 py-3 text-sm font-bold text-white transition hover:bg-samara-gold hover:text-samara-charcoal"
        >
          Enviar mensaje
        </button>
      </form>

      {status === 'success' ? (
        <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Mensaje enviado correctamente. Te contactaremos pronto.
        </p>
      ) : null}

      {errors.submit ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errors.submit}
        </p>
      ) : status === 'error' ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Revisa los campos obligatorios antes de enviar.
        </p>
      ) : null}
    </section>
  )
}

export default ContactPage
