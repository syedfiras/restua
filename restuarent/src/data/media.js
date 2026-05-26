const pexelsBase = 'https://images.pexels.com/photos'
const unsplashBase = 'https://images.unsplash.com'

export const assetStrategy = {
  hierarchy: ['hero', 'featured-dishes', 'gallery', 'textures', 'icons'],
  mood: ['cinematic', 'warm', 'dark', 'editorial', 'fine-dining'],
  rejectionRules: ['daylight catalog food', 'delivery packaging', 'watermarked media', 'casual phone photography'],
}

export function pexelsPhoto(id, slug, width = 1200) {
  return `${pexelsBase}/${id}/${slug}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

export function pexelsSrcSet(id, slug, widths = [640, 960, 1200, 1600]) {
  return widths.map((width) => `${pexelsPhoto(id, slug, width)} ${width}w`).join(', ')
}

export function unsplashPhoto(id, width = 2200, quality = 85) {
  return `${unsplashBase}/${id}?auto=format&fit=crop&w=${width}&q=${quality}`
}

export function unsplashSrcSet(id, widths = [960, 1400, 1800, 2200]) {
  return widths.map((width) => `${unsplashPhoto(id, width)} ${width}w`).join(', ')
}

export const heroMedia = {
  tier: 'hero',
  type: 'image-fallback',
  src: pexelsPhoto(262047, 'pexels-photo-262047', 2200),
  srcSet: pexelsSrcSet(262047, 'pexels-photo-262047', [960, 1400, 1800, 2200]),
  sizes: '100vw',
  alt: 'An elegant restaurant dining room prepared for evening service',
  mood: 'warm cinematic restaurant interior with intimate evening atmosphere',
  source: 'Pexels',
}

export const storyMedia = {
  src: pexelsPhoto(17592739, 'pexels-photo-17592739', 1400),
  srcSet: pexelsSrcSet(17592739, 'pexels-photo-17592739', [640, 960, 1200, 1400]),
  sizes: '(max-width: 1024px) 100vw, 50vw',
  alt: 'Fine dining plates arranged on a dark table',
  source: 'Pexels',
}
