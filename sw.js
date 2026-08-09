/* Service Worker – hält die App offline lauffähig.
   BUILD wird beim Deploy automatisch durch den Commit-Stand ersetzt.
   Läuft die Datei ungestempelt (z. B. lokal), fällt sie auf "dev" zurück. */
const STAMP = '__BUILD__';
const BUILD = STAMP.indexOf('__') === 0 ? 'dev' : STAMP;
const CACHE = 'myfitty-' + BUILD;

const ASSETS = [
  './', './index.html', './manifest.json',
  './icon-192.png', './icon-512.png', './icon-mask.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Die App darf das Warten abbrechen, wenn der Nutzer das Update annimmt */
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

/* Netzwerk zuerst, Cache als Rückfall */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
