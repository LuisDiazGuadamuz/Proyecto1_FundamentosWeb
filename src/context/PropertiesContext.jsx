import { createContext, useContext } from 'react'
import { useProperties } from '../hooks/useProperties'

const PropertiesContext = createContext(null)

export function PropertiesProvider({ children }) {
  const propertyState = useProperties()

  return (
    <PropertiesContext.Provider value={propertyState}>
      {children}
    </PropertiesContext.Provider>
  )
}

export function usePropertiesContext() {
  const context = useContext(PropertiesContext)

  if (!context) {
    throw new Error('usePropertiesContext must be used within PropertiesProvider')
  }

  return context
}
