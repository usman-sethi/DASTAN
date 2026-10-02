/**
 * High-performance image preloader for DASTAN
 * Prefetches key destination and experience imagery in background idle time
 * ensuring instant, 0ms transitions when users scroll or interact.
 */

const BASE_KEYS = [
  'hero_swat_valley',
  'dest_kalam_mountains',
  'dest_chitral_culture',
  'dest_hunza_passu',
  'dest_skardu_karakoram',
];

const preloadedCache = new Set<string>();

export function preloadImage(src: string, srcSet?: string, sizes?: string): Promise<void> {
  if (preloadedCache.has(src)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      preloadedCache.add(src);
      resolve();
    };
    img.onerror = () => {
      resolve();
    };
    if (srcSet) {
      img.srcset = srcSet;
      if (sizes) img.sizes = sizes;
    }
    img.src = src;
  });
}

export function preloadAllKeyImages(): void {
  if (typeof window === 'undefined') return;

  const isMobile = window.innerWidth <= 640;
  const isTablet = window.innerWidth <= 1024;
  const suffix = isMobile ? '-480w.webp' : (isTablet ? '-800w.webp' : '-1200w.webp');

  const runner = 'requestIdleCallback' in window
    ? (cb: () => void) => (window as unknown as { requestIdleCallback: (fn: () => void, opts?: { timeout: number }) => void }).requestIdleCallback(cb, { timeout: 1500 })
    : (cb: () => void) => setTimeout(cb, 120);

  runner(() => {
    BASE_KEYS.forEach((key) => {
      const responsiveSrc = `/images/${key}${suffix}`;
      preloadImage(responsiveSrc);
    });
  });
}
