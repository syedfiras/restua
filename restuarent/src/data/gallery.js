import { heroMedia, pexelsPhoto, pexelsSrcSet, storyMedia } from './media'

export const gallery = [
  {
    alt: 'A gourmet dish plated on a dark earthenware plate',
    caption: 'Composed plates',
    src: pexelsPhoto(5865244, 'pexels-photo-5865244', 1200),
    srcSet: pexelsSrcSet(5865244, 'pexels-photo-5865244'),
    sizes: '(max-width: 720px) 100vw, 50vw',
    source: 'Pexels',
    size: 'wide',
  },
  {
    alt: 'Elegant fine dining table with plated course and glassware',
    caption: 'Low-lit tables',
    src: pexelsPhoto(30729106, 'pexels-photo-30729106', 1200),
    srcSet: pexelsSrcSet(30729106, 'pexels-photo-30729106'),
    sizes: '(max-width: 720px) 100vw, 25vw',
    source: 'Pexels',
    size: 'tall',
  },
  {
    alt: 'Fine dining appetizer in a ceramic bowl',
    caption: 'Seasonal courses',
    src: pexelsPhoto(33474128, 'pexels-photo-33474128', 1200),
    srcSet: pexelsSrcSet(33474128, 'pexels-photo-33474128'),
    sizes: '(max-width: 720px) 100vw, 25vw',
    source: 'Pexels',
    size: 'small',
  },
  {
    alt: 'Gourmet salmon dish on a dark background',
    caption: 'Quiet detail',
    src: pexelsPhoto(29149758, 'pexels-photo-29149758', 1200),
    srcSet: pexelsSrcSet(29149758, 'pexels-photo-29149758'),
    sizes: '(max-width: 720px) 100vw, 25vw',
    source: 'Pexels',
    size: 'small',
  },
  {
    alt: 'Fine dining plate with herbs and sauce',
    caption: 'Measured service',
    src: pexelsPhoto(28705621, 'pexels-photo-28705621', 1200),
    srcSet: pexelsSrcSet(28705621, 'pexels-photo-28705621'),
    sizes: '(max-width: 720px) 100vw, 50vw',
    source: 'Pexels',
    size: 'wide',
  },
  {
    alt: 'Close up of an exquisite plated dish',
    caption: 'Final touches',
    src: pexelsPhoto(34599568, 'pexels-photo-34599568', 1200),
    srcSet: pexelsSrcSet(34599568, 'pexels-photo-34599568'),
    sizes: '(max-width: 720px) 100vw, 25vw',
    source: 'Pexels',
    size: 'small',
  },
]

export const heroImage = heroMedia.src
export const heroImageSrcSet = heroMedia.srcSet
export const heroImageSizes = heroMedia.sizes
export const heroImageAlt = heroMedia.alt
export const storyImage = storyMedia.src
export const storyImageSrcSet = storyMedia.srcSet
export const storyImageSizes = storyMedia.sizes
