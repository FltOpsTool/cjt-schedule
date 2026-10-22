/* CJT Schedule service worker.
   Caches the app shell only. Schedule data lives in IndexedDB on the phone, never here. */
const VERSION = '1.12.0';
const CACHE = 'cjt-schedule-v' + VERSION;
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192-v3.png',
  './icons/icon-512-v3.png',
  './icons/icon-maskable-512-v3.png',
  './icons/apple-touch-icon-v3.png',
  './icons/splash-v1.webp',
  './icons/duty-flight.png',
  './icons/duty-flight-day.png',
  './icons/duty-deadhead.png',
  './icons/duty-deadhead-day.png',
  './icons/duty-ground.png',
  './icons/duty-ground-day.png',
  './icons/duty-office.png',
  './icons/duty-office-day.png',
  './icons/duty-layover.png',
  './icons/duty-layover-day.png',
  './icons/duty-sim.png',
  './icons/duty-sim-day.png',
  './icons/duty-event.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('cjt-schedule-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Cache first, refresh in the background. An update shows up the next time the app opens. */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req, { ignoreSearch: true });
    const refresh = fetch(req).then(res => {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    }).catch(() => null);
    if (hit) { e.waitUntil(refresh); return hit; }
    const res = await refresh;
    if (res) return res;
    if (req.mode === 'navigate') {
      const shell = await cache.match('./index.html');
      if (shell) return shell;
    }
    return new Response('Offline', { status: 503, statusText: 'Offline' });
  })());
});
