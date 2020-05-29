
// sw.js
var cache = 'tao-te-ching';

var files = [
  'index.html',
  'fira-mono.woff2',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'apple-touch-icon.png',
  'browserconfig.xml',
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'manifest.json',
  'mstile-150x150.png',
  'safari-pinned-tab.svg',
  'site.webmanifest'
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cache).then(function(cache) {
      return cache.addAll(files)
    })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).then(function(response) {
        return caches.open(cache).then(function(cache) {
          cache.put(event.request, response.clone())
          return response
        })
      })
    })
  )
})

