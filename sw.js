const MEDIA_CACHE="latviesu-abc-media-v82";
const MEDIA=[
  "./audio/arbuzs.mp3",
  "./audio/abols.mp3",
  "./audio/balons.mp3",
  "./audio/citrons.mp3",
  "./audio/cuska.mp3",
  "./audio/durvis.mp3",
  "./audio/ezers.mp3",
  "./audio/ezelis.mp3",
  "./audio/flamings.mp3",
  "./audio/gekons.mp3",
  "./audio/gitara.mp3",
  "./audio/haizivs.mp3",
  "./audio/instrumenti.mp3",
  "./audio/ilens.mp3",
  "./audio/jers.mp3",
  "./audio/kurpe.mp3",
  "./audio/kiploks.mp3",
  "./audio/lusis.mp3",
  "./audio/lipa.mp3",
  "./audio/maja.mp3",
  "./audio/nakts.mp3",
  "./audio/nau.mp3",
  "./audio/ola.mp3",
  "./audio/pulkstenis.mp3",
  "./audio/robots.mp3",
  "./audio/siksparnis.mp3",
  "./audio/sokolade.mp3",
  "./audio/tomats.mp3",
  "./audio/ugunsdzesejs.mp3",
  "./audio/usas.mp3",
  "./audio/varaviksne.mp3",
  "./audio/zilonis.mp3",
  "./audio/zirafe.mp3",
  "./images/arbuzs.webp",
  "./images/abols.webp",
  "./images/balons.webp",
  "./images/citrons.webp",
  "./images/cuska.webp",
  "./images/durvis.webp",
  "./images/ezers.webp",
  "./images/ezelis.webp",
  "./images/flamings.webp",
  "./images/gekons.webp",
  "./images/gitara.webp",
  "./images/haizivs.webp",
  "./images/instrumenti.webp",
  "./images/ilens.webp",
  "./images/jers.webp",
  "./images/kurpe.webp",
  "./images/kiploks.webp",
  "./images/lusis.webp",
  "./images/lipa.webp",
  "./images/maja.webp",
  "./images/nakts.webp",
  "./images/nau.webp",
  "./images/ola.webp",
  "./images/pulkstenis.webp",
  "./images/robots.webp",
  "./images/siksparnis.webp",
  "./images/sokolade.webp",
  "./images/tomats.webp",
  "./images/ugunsdzesejs.webp",
  "./images/usas.webp",
  "./images/varaviksne.webp",
  "./images/zilonis.webp",
  "./images/zirafe.webp",
  "./audio/correct.wav",
  "./audio/wrong.wav",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install",event=>{
  self.skipWaiting();
  event.waitUntil(
    caches.open(MEDIA_CACHE).then(cache =>
      Promise.allSettled(MEDIA.map(url => cache.add(url)))
    )
  );
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== MEDIA_CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  if(event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const isMedia =
    url.pathname.includes("/audio/") ||
    url.pathname.includes("/images/") ||
    url.pathname.includes("/icons/");

  if(isMedia){
    event.respondWith(
      caches.match(event.request, {ignoreSearch:true}).then(hit =>
        hit || fetch(event.request).then(resp => {
          const copy = resp.clone();
          caches.open(MEDIA_CACHE).then(cache => cache.put(event.request, copy));
          return resp;
        })
      )
    );
    return;
  }

  event.respondWith(
    fetch(event.request, {cache:"no-store"}).catch(() => caches.match(event.request))
  );
});
