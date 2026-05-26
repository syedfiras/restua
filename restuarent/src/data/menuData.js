import { pexelsPhoto, pexelsSrcSet } from './media'

const pexels = (id, slug) => ({
  image: pexelsPhoto(id, slug, 800),
  srcSet: pexelsSrcSet(id, slug, [640, 800]),
})

export const menuCategories = [
  {
    id: 'starters',
    name: 'To Begin',
    description: 'First impressions, carefully composed.',
    items: [
      {
        name: 'Hamachi, Yuzu Kosho',
        description: 'Citrus-cured yellowtail, shaved daikon, micro shiso, sesame tuile.',
        price: '$24',
        ...pexels(30469694, 'pexels-photo-30469694'),
      },
      {
        name: 'Roasted Bone Marrow',
        description: 'Parsley salad, toasted sourdough, pickled shallot.',
        price: '$22',
        ...pexels(37068829, 'pexels-photo-37068829'),
      },
      {
        name: 'Tartare de Boeuf',
        description: 'Hand-cut prime beef, quail yolk, cornichon, Dijon cream, pommes gaufrettes.',
        price: '$28',
        ...pexels(28561584, 'pexels-photo-28561584'),
      },
      {
        name: 'Butternut Squash Velouté',
        description: 'Brown butter, sage, pepitas, crème fraîche.',
        price: '$18',
        ...pexels(262047, 'pexels-photo-262047'),
      },
      {
        name: 'Foie Gras Torchon',
        description: 'Brioche, fig compote, Sauternes gelée, fleur de sel.',
        price: '$36',
        ...pexels(17592739, 'pexels-photo-17592739'),
      },
      {
        name: 'Heirloom Tomato Salad',
        description: 'Burrata, basil, aged balsamic, black pepper tuile.',
        price: '$20',
        ...pexels(30469694, 'pexels-photo-30469694'),
      },
      {
        name: 'Chilled Oysters',
        description: 'Mignonette, lemon, horseradish, seaweed butter.',
        price: '$32',
        ...pexels(37068829, 'pexels-photo-37068829'),
      },
    ],
  },
  {
    id: 'mains',
    name: 'The Main Act',
    description: 'Proteins and produce at their peak.',
    items: [
      {
        name: 'Aged Duck, Black Cherry',
        description: 'Crisp skin, smoked beet reduction, preserved winter fruit.',
        price: '$48',
        ...pexels(30469694, 'pexels-photo-30469694'),
      },
      {
        name: 'Almond Crusted Sea Bass',
        description: 'Charred asparagus, lemon silk, garden herbs.',
        price: '$42',
        ...pexels(37068829, 'pexels-photo-37068829'),
      },
      {
        name: 'Dry-Aged Ribeye',
        description: '32oz prime, bone marrow butter, roasted shallot, watercress.',
        price: '$68',
        ...pexels(28561584, 'pexels-photo-28561584'),
      },
      {
        name: 'Lamb Rack, Harissa Honey',
        description: 'Smoked eggplant, labneh, pine nuts, mint.',
        price: '$54',
        ...pexels(262047, 'pexels-photo-262047'),
      },
      {
        name: 'Pan-Seared Scallops',
        description: 'Cauliflower purée, brown butter, capers, chervil.',
        price: '$46',
        ...pexels(17592739, 'pexels-photo-17592739'),
      },
      {
        name: 'Porcini Risotto',
        description: 'Aged parmesan, truffle oil, crisp enoki.',
        price: '$38',
        ...pexels(30469694, 'pexels-photo-30469694'),
      },
    ],
  },
  {
    id: 'chefs-specials',
    name: 'Chef\'s Specialities',
    description: 'The chef\'s personal selection — limited availability.',
    items: [
      {
        name: 'Wagyu Striploin, Truffle Jus',
        description: 'A5 Miyazaki wagyu, pomme purée, baby leek, black truffle emulsion.',
        price: '$98',
        ...pexels(30469694, 'pexels-photo-30469694'),
      },
      {
        name: 'Lobster Thermidor',
        description: 'Whole Atlantic lobster, gratinéed with Gruyère, tarragon, and cognac cream.',
        price: '$86',
        ...pexels(28561584, 'pexels-photo-28561584'),
      },
      {
        name: 'Pressed Duck Consommé',
        description: 'Clarified duck broth, morel mushroom, foie gras ravioli, chervil.',
        price: '$42',
        ...pexels(17592739, 'pexels-photo-17592739'),
      },
      {
        name: 'Saffron Poached Pear',
        description: 'Vanilla mascarpone, pistachio crumble, honeycomb, edible gold.',
        price: '$28',
        ...pexels(262047, 'pexels-photo-262047'),
      },
    ],
  },
  {
    id: 'desserts',
    name: 'Sweet Epilogue',
    description: 'A quiet close to the evening.',
    items: [
      {
        name: 'Nocturne Dessert',
        description: 'Dark chocolate, brown butter, edible petals.',
        price: '$24',
        ...pexels(17592739, 'pexels-photo-17592739'),
      },
      {
        name: 'Vanilla Panna Cotta',
        description: 'Strawberry consommé, basil gel, shortbread crumb.',
        price: '$18',
        ...pexels(30469694, 'pexels-photo-30469694'),
      },
      {
        name: 'Cheese Service',
        description: 'Selection of three artisanal cheeses, honeycomb, membrillo, lavosh.',
        price: '$26',
        ...pexels(37068829, 'pexels-photo-37068829'),
      },
      {
        name: 'Lemon Tart',
        description: 'Meringue, raspberry coulis, mint.',
        price: '$16',
        ...pexels(28561584, 'pexels-photo-28561584'),
      },
      {
        name: 'Chocolate Mousse',
        description: 'Valrhona dark chocolate, sea salt, olive oil.',
        price: '$20',
        ...pexels(262047, 'pexels-photo-262047'),
      },
    ],
  },
  {
    id: 'beverages',
    name: 'Libations',
    description: 'Wine, cocktails, and thoughtful pairings.',
    items: [
      {
        name: "Sommelier's Pairing",
        description: 'Five glasses, selected to complement your tasting journey.',
        price: '$75',
        ...pexels(28561584, 'pexels-photo-28561584'),
      },
      {
        name: 'The Nocturne Old Fashioned',
        description: 'Bourbon, black walnut bitters, smoked cherry.',
        price: '$22',
        ...pexels(262047, 'pexels-photo-262047'),
      },
      {
        name: 'French 75',
        description: 'Gin, Champagne, lemon, demerara.',
        price: '$20',
        ...pexels(17592739, 'pexels-photo-17592739'),
      },
      {
        name: 'Non-Alcoholic Pairing',
        description: 'House-made infusions, shrubs, and teas.',
        price: '$42',
        ...pexels(30469694, 'pexels-photo-30469694'),
      },
      {
        name: 'Espresso Martini',
        description: 'Vodka, Kahlúa, fresh espresso, vanilla bean.',
        price: '$18',
        ...pexels(37068829, 'pexels-photo-37068829'),
      },
    ],
  },
]
