const CACHE_NAME = "lifelift-v3.1";
const STATIC_ASSETS = ["/", "/index.html", "/manifest.json", "/offline-crisis-kit"];
const CRISIS_URLS = ["/offline-crisis-kit", "/api/crisis/resources"];

self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll([...STATIC_ASSETS, ...CRISIS_URLS])));
  (self as any).skipWaiting();
});

self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(caches.keys().then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))));
  (self as any).clients.claim();
});

self.addEventListener("fetch", (event: FetchEvent) => {
  const { request } = event;
  if (request.url.includes("/api/")) {
    event.respondWith(fetch(request).catch(() => new Response(JSON.stringify({ error: "You are offline." }), { status: 503, headers: { "Content-Type": "application/json" } })));
    return;
  }
  if (request.url.includes("/offline-crisis-kit")) {
    event.respondWith(caches.match(request).then((cached) => cached || fetch(request)));
    return;
  }
  event.respondWith(caches.match(request).then((cached) => cached || fetch(request)));
});

export {};
