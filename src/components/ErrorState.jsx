function ErrorState({ message }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
      <h3 className="font-display text-2xl text-red-700">Error de conexion</h3>
      <p className="mt-2 text-sm text-red-700">{message}</p>
    </div>
  )
}

export default ErrorState
