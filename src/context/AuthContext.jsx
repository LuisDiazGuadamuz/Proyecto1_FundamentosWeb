import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getMe, login as loginService } from '../services/graphqlService'

const AuthContext = createContext(null)
const TOKEN_KEY = 'samara_auth_token'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    if (typeof window === 'undefined') {
      return null
    }
    return localStorage.getItem(TOKEN_KEY)
  })
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) {
      setUser(null)
      return
    }

    const controller = new AbortController()
    setIsLoading(true)
    getMe(token, controller.signal)
      .then((data) => setUser(data))
      .catch(() => {
        setUser(null)
        setToken(null)
        localStorage.removeItem(TOKEN_KEY)
      })
      .finally(() => setIsLoading(false))

    return () => controller.abort()
  }, [token])

  const isAuthenticated = Boolean(user)

  const signIn = async (email, password) => {
    setError('')
    const data = await loginService(email, password)
    localStorage.setItem(TOKEN_KEY, data.token)
    setToken(data.token)
    setUser(data.user)
    return data
  }

  const signOut = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem(TOKEN_KEY)
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      isLoading,
      error,
      setError,
      signIn,
      signOut,
    }),
    [user, token, isAuthenticated, isLoading, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
