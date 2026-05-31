export const products = [
  {
    id: 'w-001',
    name: 'Classic Leather Bomber',
    price: 28500,
    category: 'women',
    image: '/placeholder.jpg',
    description: 'A timeless leather bomber crafted from the finest full-grain cowhide. Features a sleek silhouette with ribbed cuffs and hem, satin lining, and antique brass hardware.'
  },
  {
    id: 'w-002',
    name: 'Suede Moto Jacket',
    price: 32000,
    category: 'women',
    image: '/placeholder.jpg',
    description: 'Supple suede motorcycle jacket with asymmetric zip, epaulettes, and quilted shoulder panels. A bold feminine statement in earthy tones.'
  },
  {
    id: 'w-003',
    name: 'Minimalist Trench',
    price: 35000,
    category: 'women',
    image: '/placeholder.jpg',
    description: 'A refined leather trench coat cut from buttery-soft nappa leather. Belted waist, clean lines, and a fall-ready silhouette.'
  },
  {
    id: 'm-001',
    name: 'Heritage Biker Jacket',
    price: 34500,
    category: 'men',
    image: '/placeholder.jpg',
    description: 'A rugged biker jacket built from vegetable-tanned leather that ages beautifully. Asymmetric zip, snap-down lapels, and zip pockets throughout.'
  },
  {
    id: 'm-002',
    name: 'Vintage Aviator',
    price: 29900,
    category: 'men',
    image: '/placeholder.jpg',
    description: 'Inspired by classic flight jackets, this aviator is crafted from distressed cowhide with a shearling-lined collar and bomber silhouette.'
  },
  {
    id: 'm-003',
    name: 'Café Racer',
    price: 31500,
    category: 'men',
    image: '/placeholder.jpg',
    description: 'Stripped-back and sleek, the Café Racer features a band collar, minimal hardware, and slim-cut pattern perfect for the modern gentleman.'
  },
  {
    id: 't-001',
    name: 'The Grand Weekender',
    price: 18500,
    category: 'travel',
    image: '/placeholder.jpg',
    description: 'A structured full-grain leather duffel bag with a spacious main compartment, shoe compartment, and detachable shoulder strap. Your perfect travel companion.'
  },
  {
    id: 't-002',
    name: 'Navigator Carry-On',
    price: 24000,
    category: 'travel',
    image: '/placeholder.jpg',
    description: 'Cabin-approved leather carry-on with hard-shell structure, TSA-compliant locks, and a full leather exterior in rich cognac.'
  },
  {
    id: 't-003',
    name: 'Explorer Backpack',
    price: 15500,
    category: 'travel',
    image: '/placeholder.jpg',
    description: 'A versatile leather backpack with padded laptop sleeve, multiple organisation pockets, and top-handle carry option.'
  },
  {
    id: 'a-001',
    name: 'Artisan Bifold Wallet',
    price: 4500,
    category: 'accessories',
    image: '/placeholder.jpg',
    description: 'Hand-stitched bifold wallet in full-grain leather. 8 card slots, 2 currency compartments, and a slim profile that sits perfectly in your pocket.'
  },
  {
    id: 'a-002',
    name: 'Heritage Belt',
    price: 6500,
    category: 'accessories',
    image: '/placeholder.jpg',
    description: 'A vegetable-tanned leather belt with solid brass pin buckle. Available in multiple widths and lengths, with a patina that deepens over years of wear.'
  },
  {
    id: 'a-003',
    name: 'Cardholder Slim',
    price: 3200,
    category: 'accessories',
    image: '/placeholder.jpg',
    description: 'Minimalist 4-card holder in shell cordovan leather. Holds up to 6 cards with a centre slot for folded notes.'
  }
];

export const getProductById = (id) => products.find((p) => p.id === id);
export const getProductsByCategory = (category) =>
  products.filter((p) => p.category === category.toLowerCase());
