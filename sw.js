const staticCacheName = 's-app-v3'
// const dynamicCacheName = 'd-app-v3'

const assetUrls = [
  'menu-1v/index.html',
  'menu-1v/app.js',
  'menu-1v/style.css',
  'menu-1v/script.js',
  'menu-1v/icon/favicon.ico'
];

// self.addEventListener('install', event => {
//   console.log('Installing [Service Worker]', event);

//   event.waitUntil(
//     caches.open('static')
//       .then(cache => {
//         console.log('[Service Worker] Precaching App Shell');
//         cache.addAll([
//           'index.html',
//           'app.js',
//           'style.css',
//           'burger.css',
//           'script.js',
//           'icon/favicon.ico'
//         ]);
//       }));
// });


self.addEventListener('install', async event => {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(assetUrls);
});


self.addEventListener('activate', async event => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter(name => name !== staticCacheName)
      // .filter(name => name !== dynamicCacheName)
      .map(name => caches.delete(name))
  );
})

// self.addEventListener('fetch', event => {
  
//   const {request} = event

//   const url = new URL(request.url)
//   if (url.origin === location.origin) {
//     event.respondWith(cacheFirst(request))
//   } else {
//     event.respondWith(networkFirst(request))
//   }
//   console.log('Fetch', event.request.url);
// })

// async function cacheFirst(request) {
//   const cached = await caches.match(request)
//   return cached ?? await fetch(request)
// }

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        } else {
          return fetch(event.request);
        }
      })
    );
});


// async function networkFirst(request) {
//   const cache = await caches.open(dynamicCacheName)
//   try {
//     const response = await fetch(request)
//     await cache.put(request, response.clone())
//     return response
//   } catch (e) {
//     const cached = await cache.match(request)
//     return cached ?? await caches.match('index.html')
//   }
// }