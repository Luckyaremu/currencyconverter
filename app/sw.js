var staticCacheName = 'currency-cache-v1';

self.addEventListener('install', function(event) {
 event.waitUntil(
   caches.open(staticCacheName).then(function(cache) {
     return cache.addAll([
       'index.html',
       '/css/custom.css',
       '/scripts/currency.js',
       '/jquery/dist/jquery.min.js',
       '/bootstrap/dist/js/bootstrap.min.js',
       '/bootstrap/dist/css/bootstrap.min.css',
       'https://free.currencyconverterapi.com/api/v5/currencies',
       'https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y'
     ]);
   })
 );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
      cacheNames.filter(function(cacheName){
        return cacheName.startsWith('currency-')&&
               cacheName != staticCacheName;
      }).map(function(cacheName) {
        return cache.delete(cacheName);
      })
    );
    })
  )
})
//