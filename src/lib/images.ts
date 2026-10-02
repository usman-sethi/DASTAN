/**
 * Responsive Image Strategy for DASTAN
 * Generates and maps multi-resolution WebP srcSet descriptors
 * for optimal viewport delivery (mobile, tablet, desktop, high-DPI displays).
 */

export const HERO_SIZES = '100vw';
export const DESTINATION_GRID_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
export const FEATURED_DESTINATION_SIZES = '(max-width: 1024px) 100vw, 58vw';
export const MODAL_HERO_SIZES = '(max-width: 768px) 100vw, 896px';
export const EXPERIENCE_CARD_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px';

/**
 * Return responsive srcSet for any public destination or experience WebP image
 */
export function getResponsiveWebPSrcSet(baseSrc: string): string {
  if (!baseSrc || !baseSrc.endsWith('.webp')) {
    return baseSrc;
  }

  // Extract base name without .webp and without existing width suffix
  const match = baseSrc.match(/^(.*\/[^/]+?)(?:-(?:480|800|1200|1376)w)?\.webp$/);
  if (!match) return baseSrc;

  const basePath = match[1];

  // Specific widths available based on original aspect and dimensions
  if (basePath.includes('hero_swat_valley')) {
    return `${basePath}-480w.webp 480w, ${basePath}-800w.webp 800w, ${basePath}-1200w.webp 1200w, ${basePath}.webp 1376w`;
  }

  return `${basePath}-480w.webp 480w, ${basePath}-800w.webp 800w, ${basePath}-1200w.webp 1200w`;
}
