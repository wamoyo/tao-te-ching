
// sw.js
var cache = 'tao-te-ching';

var files = [
  'index.html',
  'fira-mono.woff2',
  'main.css',
  'yin-yang.jpg'
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

