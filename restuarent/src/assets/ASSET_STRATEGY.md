# Midnight Atelier Asset Strategy

## Asset Hierarchy

1. Hero media: cinematic, dark, editorial, with negative space for typography.
2. Featured dishes: fine-dining plating, dramatic light, premium crop discipline.
3. Gallery: balanced mix of table mood, dish detail, chef or service atmosphere, and glass/candle texture.
4. Textures: subtle grain, vignette, ambient shadow. Never obvious.
5. Icons: minimal, functional, typography-led interface first.

## Current Mode

The site currently uses curated remote Pexels and Unsplash imagery through `src/data/media.js`.

When final production assets are available, replace remote URLs with optimized local WebP or AVIF files under:

- `src/assets/images/hero/`
- `src/assets/images/dishes/`
- `src/assets/images/gallery/`
- `src/assets/images/textures/`
- `src/assets/videos/hero/`

## Quality Rules

- Hero image or video must carry the brand. Reject anything casual, bright, shaky, low-res, or watermarked.
- Keep all images warm, dark, cinematic, and editorial.
- Avoid delivery food, packaging, phone photos, catalog lighting, and mismatched daylight shots.
- Hero video, if added, should be 8-15 seconds, muted, loopable, 1920x1080 minimum, and ideally under 8-12 MB.
- Section images should be compressed to roughly 300-500 KB where possible.

## Production Replacement Checklist

- Add local hero WebP/AVIF or looped MP4/WebM.
- Add 3 local featured dish images.
- Add 6-8 local gallery images.
- Update `src/data/media.js`, `src/data/dishes.js`, and `src/data/gallery.js`.
- Keep `srcSet`, `sizes`, `alt`, and source metadata.
- Run build and inspect desktop/mobile crops before shipping.
