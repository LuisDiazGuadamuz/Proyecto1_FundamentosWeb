import { useEffect, useState } from 'react'

const FAVORITES_KEY = 'samara_favorites'
const listeners = new Set()
let currentFavorites = []

function loadFavorites() {
  if (typeof window === 'undefined') {
    return []
  }
  try {
    const stored = window.localStorage.getItem(FAVORITES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveFavorites(favorites) {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
}

function notifyFavorites(favorites) {
  listeners.forEach((listener) => listener(favorites))
}

function setGlobalFavorites(nextFavorites) {
  const next = typeof nextFavorites === 'function' ? nextFavorites(currentFavorites) : nextFavorites
  currentFavorites = next
  saveFavorites(next)
  notifyFavorites(next)
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    currentFavorites = loadFavorites()
    return currentFavorites
  })

  useEffect(() => {
    listeners.add(setFavorites)
    return () => {
      listeners.delete(setFavorites)
    }
  }, [])

  const toggleFavorite = (property) => {
    setGlobalFavorites((current) => {
      const exists = current.some((item) => item.id === property.id)
      if (exists) {
        return current.filter((item) => item.id !== property.id)
      }
      return [...current, property]
    })
  }

  const removeFavorite = (id) => {
    setGlobalFavorites((current) => current.filter((item) => item.id !== id))
  }

  const isFavorite = (id) => favorites.some((item) => item.id === id)

  return {
    favorites,
    toggleFavorite,
    removeFavorite,
    isFavorite,
  }
}
