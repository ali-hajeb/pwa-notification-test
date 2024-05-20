// src/serviceWorker.ts
// This TypeScript service worker script handles background tasks and notifications.

self.addEventListener("install", (event: ExtendableEvent) => {
    console.log("Service Worker installing.");
    // Perform install steps
});

self.addEventListener("activate", (event: ExtendableEvent) => {
    console.log("Service Worker activating.");
    // Clean up old caches
});

self.addEventListener("fetch", (event: FetchEvent) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
