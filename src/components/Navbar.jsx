import { NavLink } from 'react-router-dom'
import samaraLogo from '../assets/samara-logo.svg'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/properties', label: 'Propiedades' },
  { to: '/favorites', label: 'Favoritos' },
  { to: '/contact', label: 'Contáctenos' },
]

function Navbar() {
  const { isAuthenticated, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-30 border-b border-samara-stone/60 bg-samara-ivory/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
        <NavLink
          to="/"
          className="flex shrink-0 items-center justify-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-samara-gold/70"
          aria-label="Ir al inicio de Samara Real Estate"
        >
          <img
            src={samaraLogo}
            alt="Samara Real Estate"
            className="h-14 w-auto max-w-[220px] object-contain sm:h-16 sm:max-w-[260px] lg:h-20 lg:max-w-[320px]"
          />
        </NavLink>

        <ul className="flex flex-wrap items-center justify-center gap-2 sm:justify-end sm:gap-4">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
                    isActive
                      ? 'bg-samara-charcoal text-white'
                      : 'text-samara-ash hover:bg-samara-stone/50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
                  isActive
                    ? 'bg-samara-charcoal text-white'
                    : 'text-samara-ash hover:bg-samara-stone/50'
                }`
              }
            >
              Admin
            </NavLink>
          </li>
          {!isAuthenticated ? (
            <li>
              <NavLink
                to="/admin/login"
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
                    isActive
                      ? 'bg-samara-charcoal text-white'
                      : 'text-samara-ash hover:bg-samara-stone/50'
                  }`
                }
              >
                Login
              </NavLink>
            </li>
          ) : (
            <li>
              <button
                type="button"
                onClick={signOut}
                className="rounded-full px-3 py-2 text-sm font-semibold text-samara-ash transition hover:bg-samara-stone/50"
              >
                Salir
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
