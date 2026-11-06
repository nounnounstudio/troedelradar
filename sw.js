// Trödelradar: Die App-Hülle funktioniert auch ohne Netz. Daten vom Server werden nie zwischengespeichert.
const C='tr-v2',SHELL=['./','index.html','impressum.html','datenschutz.html','nutzungsbedingungen.html','konto-loeschen.html','icon-192.png','icon-512.png','manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request.mode==='navigate'?'index.html':e.request,cp))}return r}).catch(()=>caches.match(e.request.mode==='navigate'?'index.html':e.request,{ignoreSearch:true})))});
