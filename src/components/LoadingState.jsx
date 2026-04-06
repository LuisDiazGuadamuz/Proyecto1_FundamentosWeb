function LoadingState({ label = 'Cargando propiedades...' }) {
  return (
    <div className="rounded-2xl border border-samara-stone/70 bg-white p-10 text-center shadow-card">
      <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-samara-stone border-t-samara-gold" />
      <p className="mt-4 text-samara-ash">{label}</p>
    </div>
  )
}

export default LoadingState
