const VERSION = 'v1'
const STATIC_CACHE = `samara-static-${VERSION}`
const API_CACHE = `samara-api-${VERSION}`
const BASE_PATH = new URL(self.location.href).pathname.replace(/sw\.js$/, '')
const OFFLINE_URL = `${BASE_PATH}offline.html`

const STATIC_ASSETS = [
  `${BASE_PATH}`,
  `${BASE_PATH}index.html`,
  OFFLINE_URL,
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => ![STATIC_CACHE, API_CACHE].includes(key))
          .map((key) => caches.delete(key)),
      )
    }),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (request.method !== 'GET') {
    return
  }

  if (url.pathname.endsWith('/properties.json')) {
    event.respondWith(networkFirstForApi(request))
    return
  }

  if (request.destination === 'document') {
    event.respondWith(networkWithOfflineFallback(request))
    return
  }

  if (['style', 'script', 'image', 'font'].includes(request.destination)) {
    event.respondWith(cacheFirstForAssets(request))
  }
})

async function cacheFirstForAssets(request) {
  const cache = await caches.open(STATIC_CACHE)
  const cached = await cache.match(request)

  if (cached) {
    return cached
  }

  const response = await fetch(request)
  cache.put(request, response.clone())
  return response
}

async function networkFirstForApi(request) {
  const cache = await caches.open(API_CACHE)

  try {
    const fresh = await fetch(request)
    cache.put(request, fresh.clone())
    return fresh
  } catch {
    const cached = await cache.match(request)
    if (cached) {
      return cached
    }

    return new Response(JSON.stringify({ properties: [] }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  }
}

async function networkWithOfflineFallback(request) {
  const cache = await caches.open(STATIC_CACHE)

  try {
    const fresh = await fetch(request)
    cache.put(request, fresh.clone())
    return fresh
  } catch {
    const cached = await cache.match(request)
    return cached || cache.match(OFFLINE_URL)
  }
}
