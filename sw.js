const CACHE_NAME = "web-media-player-20251224071112";
const REGULAR_ASSETS = // embeded from ./resouce/regular-assets.json
[
    "./",
    "./image/appicon.png",
    "./image/favicon.png"
];
const WEB_MANIFEST_ASSETS =// embeded from ./locale/generated/web-manifest-assets.json
[
    "./web.manifest/generated/ar.json",
    "./web.manifest/generated/de.json",
    "./web.manifest/generated/el.json",
    "./web.manifest/generated/en.json",
    "./web.manifest/generated/es.json",
    "./web.manifest/generated/fa.json",
    "./web.manifest/generated/fr.json",
    "./web.manifest/generated/hi.json",
    "./web.manifest/generated/id.json",
    "./web.manifest/generated/it.json",
    "./web.manifest/generated/ja.json",
    "./web.manifest/generated/ko.json",
    "./web.manifest/generated/nl.json",
    "./web.manifest/generated/pl.json",
    "./web.manifest/generated/pt.json"
];
const ASSETS = REGULAR_ASSETS.concat(WEB_MANIFEST_ASSETS);
self.addEventListener
(
    "install",
    event =>
    {
        event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
        self.skipWaiting();
    }
);
self.addEventListener
(
    "activate",
    event =>
    {
        event.waitUntil
        (
            caches.keys().then
            (
                keys => Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : Promise.resolve())))
            )
        );
        self.clients.claim();
    }
);
self.addEventListener
(
    "fetch",
    event =>
    {
        if ("navigate" === event.request.mode)
        {
            event.respondWith
            (
                fetch(event.request).catch(() => caches.match("./"))
            );
        }
        else
        {
            event.respondWith
            (
                caches.match(event.request).then
                (
                    resp => resp || fetch(event.request).then
                    (
                        r =>
                        {
                            return caches.open(CACHE_NAME).then
                            (
                                cache =>
                                {
                                    cache.put(event.request, r.clone());
                                    return r;
                                }
                            );
                        }
                    )
                )
            );
        }
    }
);
