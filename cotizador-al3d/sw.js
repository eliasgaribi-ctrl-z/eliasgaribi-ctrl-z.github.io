/* Retira la app vieja de los teléfonos que la tenían instalada en esta dirección.

   La app de AL3D vivía aquí (github.io/cotizador-al3d/) con un service worker que la servía
   desde la memoria del teléfono. Desde noviembre de 2026 vive en cotizador-al3d.pages.dev.
   Cuando un teléfono abre el ícono viejo, el navegador ve este sw.js nuevo, lo instala y:

     1. borra las cachés de la app (solo las que empiezan con «al3d-»: este origen lo comparten
        otras páginas de la cuenta, y las suyas no se tocan);
     2. se da de baja, para que nada siga sirviendo la app vieja;
     3. recarga las ventanas abiertas: ya sin service worker, llegan a la página del desvío,
        que ofrece pasar los datos del teléfono a la dirección nueva.

   Los datos del teléfono (localStorage e IndexedDB) NO se tocan: son los que la mudanza pasa. */
self.addEventListener('install', function () { self.skipWaiting(); });

self.addEventListener('activate', function (ev) {
  ev.waitUntil((async function () {
    try {
      var nombres = await caches.keys();
      await Promise.all(nombres.filter(function (n) { return n.indexOf('al3d-') === 0; })
                               .map(function (n) { return caches.delete(n); }));
    } catch (e) {}
    try { await self.registration.unregister(); } catch (e) {}
    try {
      var ventanas = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      await Promise.all(ventanas.map(function (v) { return v.navigate(v.url).catch(function () {}); }));
    } catch (e) {}
  })());
});
