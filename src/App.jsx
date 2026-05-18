import { AuthProvider } from './context/AuthContext'
import { PropertiesProvider } from './context/PropertiesContext'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <AuthProvider>
      <PropertiesProvider>
        <AppRouter />
      </PropertiesProvider>
    </AuthProvider>
  )
}

export default App
