import { pexelsPhoto, pexelsSrcSet } from './media'

export const dishes = [
  {
    name: 'Aged Duck, Black Cherry',
    descriptor: 'Crisp skin, smoked beet reduction, preserved winter fruit.',
    price: '$48',
    image: pexelsPhoto(30469694, 'pexels-photo-30469694', 1600),
    srcSet: pexelsSrcSet(30469694, 'pexels-photo-30469694', [720, 1100, 1400, 1600]),
    sizes: '(max-width: 1024px) 100vw, 62vw',
    source: 'Pexels',
    featured: true,
  },
  {
    name: 'Almond Crusted Sea Bass',
    descriptor: 'Charred asparagus, lemon silk, garden herbs.',
    price: '$42',
    image: pexelsPhoto(37068829, 'pexels-photo-37068829', 1200),
    srcSet: pexelsSrcSet(37068829, 'pexels-photo-37068829'),
    sizes: '(max-width: 1024px) 100vw, 38vw',
    source: 'Pexels',
  },
  {
    name: 'Nocturne Dessert',
    descriptor: 'Dark chocolate, brown butter, edible petals.',
    price: '$24',
    image: pexelsPhoto(28561584, 'pexels-photo-28561584', 1200),
    srcSet: pexelsSrcSet(28561584, 'pexels-photo-28561584'),
    sizes: '(max-width: 1024px) 100vw, 38vw',
    source: 'Pexels',
  },
]
