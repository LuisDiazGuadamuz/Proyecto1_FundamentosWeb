import { PropertiesProvider } from './context/PropertiesContext'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <PropertiesProvider>
      <AppRouter />
    </PropertiesProvider>
  )
}

export default App
