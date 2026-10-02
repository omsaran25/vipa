import { imageFallback } from '../data/siteLinks';

/** Use on <img onError={handleImageError} /> to avoid broken image placeholders. */
export function handleImageError(event) {
  const img = event.currentTarget;
  if (img.dataset.fallbackApplied === 'true') return;
  img.dataset.fallbackApplied = 'true';
  img.src = imageFallback;
}
