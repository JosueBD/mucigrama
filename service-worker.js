const CACHE_NAME = 'mucigrama-cache-v1'; // Un nombre para la versión de tu caché
const urlsToCache = [
  './', // Cacha la página de inicio
  './index.html',
  './manifest.json',
  // Es importante cachar también la biblioteca de TailwindCSS si la cargas desde un CDN
  'https://cdn.tailwindcss.com',
  // Y los íconos de tu aplicación
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
  // Si tuvieras más archivos CSS o JS externos, agrégalos aquí
];

// Evento 'install': se dispara cuando el Service Worker se instala por primera vez
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME) // Abre la caché con el nombre que definimos
      .then(cache => {
        console.log('Service Worker: Cache abierta');
        return cache.addAll(urlsToCache); // Agrega todos los archivos a la caché
      })
  );
});

// Evento 'fetch': se dispara cada vez que la app intenta hacer una petición de red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request) // Intenta encontrar la petición en la caché
      .then(response => {
        if (response) {
          console.log('Service Worker: Sirviendo desde la caché', event.request.url);
          return response; // Si está en caché, la devuelve
        }
        // Si no está en caché, hace la petición a la red
        console.log('Service Worker: No en caché, solicitando de la red', event.request.url);
        return fetch(event.request);
      })
  );
});

// Evento 'activate': se dispara cuando un nuevo Service Worker toma el control
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]; // Solo queremos mantener esta versión de la caché
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Elimina otras cachés antiguas para ahorrar espacio
            console.log('Service Worker: Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});