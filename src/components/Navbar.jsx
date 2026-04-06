import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/properties', label: 'Propiedades' },
  { to: '/contact', label: 'Contactenos' },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-samara-stone/60 bg-samara-ivory/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="font-display text-2xl font-semibold tracking-tight text-samara-charcoal">
          Samara <span className="text-samara-gold">Rentals</span>
        </NavLink>

        <ul className="flex items-center gap-2 sm:gap-4">
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
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
