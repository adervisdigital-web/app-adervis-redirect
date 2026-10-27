// Старый кэш приложения на app.adervis.ru больше не нужен: чистим и отпускаем вкладки на новый адрес.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: 'window' })) {
    const u = new URL(c.url);
    c.navigate('https://crm.adervis.ru' + u.pathname + u.search + u.hash);
  }
})()));
