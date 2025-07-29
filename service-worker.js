const CACHE_NAME = 'mucigrama-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Cache abierta');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Error al precachear los archivos:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Service Worker: Sirviendo desde la caché', event.request.url);
          return response;
        }
        console.log('Service Worker: No en caché, solicitando de la red', event.request.url);
        return fetch(event.request);
      })
      .catch(() => {
        // En caso de error, puedes devolver una página de fallback si lo necesitas
        // Por ahora, simplemente devolvemos un error de red
        return new Response('Network error occurred', { status: 408, headers: { 'Content-Type': 'text/plain' } });
      })
  );
});

// Este es el cambio clave para la activación inmediata
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        // Activa el Service Worker inmediatamente para tomar el control de la página
        return self.clients.claim();
    })
  );
});
