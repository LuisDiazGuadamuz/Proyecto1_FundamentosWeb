import samaraLogo from '../assets/samara-logo.svg'

function Footer() {
  return (
    <footer className="border-t border-samara-stone/70 bg-white/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-samara-ash sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center justify-center sm:justify-start">
          <img
            src={samaraLogo}
            alt="Samara Real Estate"
            className="h-10 w-auto max-w-[180px] object-contain sm:h-12 sm:max-w-[220px]"
          />
        </div>
        <p>Servicio moderno, seguro y confiable</p>
      </div>
    </footer>
  )
}

export default Footer
