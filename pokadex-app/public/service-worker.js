const cacheName = 'pokedex-cache-v1';
const assetsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.ico',
    '/icons/favicon-16x16.png',
    '/icons/favicon-32x32.png',
    '/icons/android-chrome-192x192.png',
    '/icons/android-chrome-512x512.png',
    '/icons/apple-touch-icon.png',
  ];

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        return cache.addAll(assetsToCache);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((thisCacheName) => {
          if (thisCacheName !== cacheName) {
            return caches.delete(thisCacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; 
        } else {
          return fetch(event.request) 
            .then((response) => {
              return caches.open(cacheName).then((cache) => {
                cache.put(event.request.url, response.clone());
                return response;
              });
            })
            .catch((error) => {
              console.error('Error fetching and caching new data', error);
            });
        }
      })
  );
});
