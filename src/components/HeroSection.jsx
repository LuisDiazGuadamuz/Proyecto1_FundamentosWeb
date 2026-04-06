import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-samara-stone/70 bg-white p-8 shadow-card sm:p-12">
      <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gold-gradient opacity-25 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-samara-charcoal opacity-10 blur-3xl" aria-hidden="true" />

      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-samara-stone bg-samara-ivory px-4 py-1 text-xs font-bold uppercase tracking-[0.12em] text-samara-ash">
            Propiedades en venta
          </span>
          <h1 className="mt-5 font-display text-4xl leading-tight text-samara-charcoal sm:text-5xl">
            Encuentra tu proxima inversion con estilo y seguridad.
          </h1>
          <p className="mt-4 max-w-xl text-base text-samara-ash sm:text-lg">
            Samara Rentals conecta compradores con hogares y residencias premium en zonas de alta plusvalia.
          </p>
          <Link
            to="/properties"
            className="mt-8 inline-flex items-center rounded-full bg-samara-charcoal px-6 py-3 text-sm font-bold text-white transition hover:bg-samara-gold hover:text-samara-charcoal"
          >
            Ver catalogo
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-samara-stone/70">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
            alt="Residencia moderna con piscina"
            className="h-72 w-full object-cover sm:h-96"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
