'use strict';
const CACHE_NAME = 'get-wired-shell-v1';
const CORE_ASSETS = ['/offline.html', '/manifest.webmanifest', '/assets/pwa-icon.svg'];
const NETWORK_ONLY_PAGES = new Set(['/index-new.html', '/products.html', '/product.html', '/category.html', '/checkout-v2.html', '/account.html']);

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('get-wired-shell-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // Never cache Supabase, auth, pricing, shipping or order API traffic.
  if (NETWORK_ONLY_PAGES.has(url.pathname)) {
    event.respondWith(fetch(request).catch(() => caches.match('/offline.html')));
    return;
  }
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      if (response.ok && response.type === 'basic') {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(url.pathname, copy));
      }
      return response;
    }).catch(async () => (await caches.match(url.pathname)) || (await caches.match('/offline.html'))));
    return;
  }
  if (/\.(?:css|js|svg|png|webp|ico|woff2?)$/i.test(url.pathname) || url.pathname === '/manifest.webmanifest') {
    event.respondWith(caches.open(CACHE_NAME).then(async cache => {
      const cached = await cache.match(url.pathname);
      const update = fetch(request).then(response => {
        if (response.ok && response.type === 'basic') cache.put(url.pathname, response.clone());
        return response;
      }).catch(() => cached);
      return cached || update;
    }));
  }
});