import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center rounded-2xl border border-samara-stone/70 bg-white p-10 text-center shadow-card">
      <h1 className="font-display text-5xl text-samara-charcoal">404</h1>
      <p className="mt-3 text-samara-ash">La pagina que buscas no existe o fue movida.</p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-full bg-samara-charcoal px-6 py-3 text-sm font-bold text-white transition hover:bg-samara-gold hover:text-samara-charcoal"
      >
        Volver al inicio
      </Link>
    </section>
  )
}

export default NotFoundPage
