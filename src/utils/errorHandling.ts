export const handleChunkLoadError = (): void => {
  window.addEventListener('error', (event: ErrorEvent & { target: EventTarget | null }) => {
    const target = event.target || (event as any).srcElement;
    
    const isChunkLoadError =
      event.message &&
      (event.message.includes('Loading chunk') ||
        event.message.includes('Loading CSS chunk') ||
        event.message.includes('module not found'));

    // Check if the error is related to chunk loading
    if (
      isChunkLoadError ||
      (target &&
        target instanceof HTMLLinkElement &&
        target.href &&
        target.href.includes('.chunk.'))
    ) {
      console.log('Detected chunk loading error. Refreshing page...');

      // Clear cache if supported
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name);
          });
        });
      }

      // Force reload with cache busting
      window.location.reload();
    }
  }, false);
};
