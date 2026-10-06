export type Product = {
  slug: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  short: string;
  flowers: string[];
  colors: string[];
  occasions: string[];
  sizes: string[];
  collection: string;
  featured?: boolean;
  availability: "In stock" | "Limited";
};

export const products: Product[] = [
  {
    slug: "classic-red",
    name: "Classic Red",
    price: 1799,
    rating: 4.9,
    reviews: 186,
    image: "/bouquets/classic-red.jpg",
    images: ["/bouquets/classic-red.jpg", "/bouquets/sunflower-smile.jpg", "/bouquets/elegant-romance.jpg"],
    description: "Deep red roses and baby's breath, hand-tied and wrapped in vintage newspaper-style paper.",
    short: "Red roses, baby's breath, newspaper wrap.",
    flowers: ["Rose", "Baby's Breath"],
    colors: ["Red", "White"],
    occasions: ["Love & Romance", "Anniversary", "Just Because"],
    sizes: ["Regular", "Deluxe", "Premium"],
    collection: "Elegant Roses",
    featured: true,
    availability: "In stock",
  },
  {
    slug: "blush-romance",
    name: "Blush Romance",
    price: 1499,
    rating: 4.8,
    reviews: 142,
    image: "/bouquets/blush.jpg",
    images: ["/bouquets/blush.jpg", "/bouquets/pastel.jpg", "/bouquets/butterfly.jpg"],
    description: "A delicate arrangement of pink roses, baby's breath and eucalyptus, wrapped in premium paper.",
    short: "Pink roses in layered paper and ribbon.",
    flowers: ["Rose"],
    colors: ["Pink"],
    occasions: ["Love & Romance", "Anniversary", "Birthday"],
    sizes: ["Regular", "Deluxe", "Premium"],
    collection: "Elegant Roses",
    featured: true,
    availability: "In stock",
  },
  {
    slug: "sunflower-smile",
    name: "Sunflower Smile",
    price: 1299,
    rating: 4.7,
    reviews: 98,
    image: "/bouquets/sunflower-smile.jpg",
    images: ["/bouquets/sunflower-smile.jpg", "/bouquets/classic-red.jpg", "/bouquets/blue-sunshine.jpg"],
    description: "Golden sunflowers with red roses, eucalyptus and a handwritten ribbon.",
    short: "Sunflowers, red roses, eucalyptus.",
    flowers: ["Sunflower", "Rose"],
    colors: ["Yellow", "Red"],
    occasions: ["Birthday", "Congratulations", "Just Because"],
    sizes: ["Regular", "Deluxe", "Premium"],
    collection: "Sunny Blooms",
    featured: true,
    availability: "In stock",
  },
  {
    slug: "blue-sunshine",
    name: "Blue Sunshine",
    price: 1699,
    rating: 4.8,
    reviews: 76,
    image: "/bouquets/blue-sunshine.jpg",
    images: ["/bouquets/blue-sunshine.jpg", "/bouquets/sunflower-smile.jpg", "/bouquets/pastel.jpg"],
    description: "Sunflowers set against dusty blues, white lilies and a navy wrap.",
    short: "Sunflowers in a navy and blue palette.",
    flowers: ["Sunflower", "Lily", "Rose"],
    colors: ["Blue", "Yellow", "White"],
    occasions: ["Just Because", "Congratulations", "Birthday"],
    sizes: ["Regular", "Deluxe", "Premium"],
    collection: "Sunny Blooms",
    availability: "Limited",
  },
  {
    slug: "pastel-dreams",
    name: "Pastel Dreams",
    price: 1599,
    rating: 4.9,
    reviews: 121,
    image: "/bouquets/pastel.jpg",
    images: ["/bouquets/pastel.jpg", "/bouquets/blush.jpg", "/bouquets/turtle.jpg"],
    description: "A garden mix of gerberas, roses, lilies and daisies in cream paper.",
    short: "Mixed garden bouquet in cream paper.",
    flowers: ["Rose", "Lily", "Daisy", "Sunflower"],
    colors: ["Pink", "Yellow", "White", "Mixed"],
    occasions: ["Birthday", "Just Because", "Congratulations"],
    sizes: ["Regular", "Deluxe", "Premium"],
    collection: "Pastel Dreams",
    featured: true,
    availability: "In stock",
  },
  {
    slug: "elegant-romance",
    name: "Elegant Romance",
    price: 2199,
    rating: 5,
    reviews: 88,
    image: "/bouquets/elegant-romance.jpg",
    images: ["/bouquets/elegant-romance.jpg", "/bouquets/blush.jpg", "/bouquets/classic-red.jpg"],
    description: "Stargazer lilies rising through red and blush roses.",
    short: "Lilies and roses, deeply romantic.",
    flowers: ["Lily", "Rose"],
    colors: ["Red", "Pink", "White"],
    occasions: ["Anniversary", "Love & Romance"],
    sizes: ["Regular", "Deluxe", "Premium"],
    collection: "Elegant Roses",
    featured: true,
    availability: "In stock",
  },
  {
    slug: "turtle-love",
    name: "Turtle Love",
    price: 2199,
    rating: 4.9,
    reviews: 64,
    image: "/bouquets/turtle.jpg",
    images: ["/bouquets/turtle.jpg", "/bouquets/pastel.jpg", "/bouquets/graduation.jpg"],
    description: "Sunflowers, lilies, tulips and daisies gathered around a small plush turtle.",
    short: "Garden flowers with a plush turtle.",
    flowers: ["Sunflower", "Lily", "Tulip", "Daisy"],
    colors: ["Yellow", "Pink", "White", "Mixed"],
    occasions: ["Birthday", "Just Because", "Congratulations"],
    sizes: ["Regular", "Deluxe", "Premium"],
    collection: "Unique Designs",
    featured: true,
    availability: "Limited",
  },
  {
    slug: "butterfly-bloom",
    name: "Butterfly Bloom",
    price: 2499,
    rating: 4.9,
    reviews: 54,
    image: "/bouquets/butterfly.jpg",
    images: ["/bouquets/butterfly.jpg", "/bouquets/blush.jpg", "/bouquets/installation.jpg"],
    description: "Mauve and cream roses framed by handcrafted butterfly wings.",
    short: "Roses with sculptural butterfly wings.",
    flowers: ["Rose"],
    colors: ["Pink", "Purple", "Mixed"],
    occasions: ["Love & Romance", "Anniversary", "Just Because"],
    sizes: ["Deluxe", "Premium"],
    collection: "Unique Designs",
    featured: true,
    availability: "Limited",
  },
  {
    slug: "elegant-tulips",
    name: "Elegant Tulips",
    price: 1899,
    rating: 4.8,
    reviews: 71,
    image: "/bouquets/tulip-bag.jpg",
    images: ["/bouquets/tulip-bag.jpg", "/bouquets/pastel.jpg", "/bouquets/blush.jpg"],
    description: "Blush and ivory tulips presented in a floral handbag silhouette.",
    short: "Tulips arranged as a floral handbag.",
    flowers: ["Tulip"],
    colors: ["Pink", "White"],
    occasions: ["Birthday", "Just Because", "Congratulations", "Sympathy"],
    sizes: ["Regular", "Deluxe"],
    collection: "Unique Designs",
    availability: "In stock",
  },
  {
    slug: "daisy-dream",
    name: "Daisy Dream",
    price: 1499,
    rating: 4.8,
    reviews: 93,
    image: "/bouquets/graduation.jpg",
    images: ["/bouquets/graduation.jpg", "/bouquets/pastel.jpg", "/bouquets/turtle.jpg"],
    description: "A field of white daisies in black and ivory paper, finished with a satin bow.",
    short: "White daisies with a black paper wrap.",
    flowers: ["Daisy"],
    colors: ["White", "Yellow"],
    occasions: ["Congratulations", "Just Because", "Birthday"],
    sizes: ["Regular", "Deluxe", "Premium"],
    collection: "Mixed Blooms",
    featured: true,
    availability: "In stock",
  },
  {
    slug: "petal-installation",
    name: "Petal Installation",
    price: 8999,
    rating: 5,
    reviews: 21,
    image: "/bouquets/installation.jpg",
    images: ["/bouquets/installation.jpg", "/bouquets/blush.jpg", "/bouquets/butterfly.jpg"],
    description: "A blush floral wing installation for celebrations and studio events.",
    short: "Large blush floral installation.",
    flowers: ["Rose", "Lily"],
    colors: ["Pink", "White", "Mixed"],
    occasions: ["Congratulations", "Love & Romance", "Anniversary"],
    sizes: ["Premium"],
    collection: "Unique Designs",
    availability: "Limited",
  },
];

export const collections = [
  { slug: "elegant-roses", name: "Elegant Roses", image: "/bouquets/blush.jpg", line: "Roses, composed." },
  { slug: "sunny-blooms", name: "Sunny Blooms", image: "/bouquets/sunflower-smile.jpg", line: "Gold, in season." },
  { slug: "pastel-dreams", name: "Pastel Dreams", image: "/bouquets/pastel.jpg", line: "Soft garden colour." },
  { slug: "unique-designs", name: "Unique Designs", image: "/bouquets/butterfly.jpg", line: "Made to be remembered." },
  { slug: "mixed-blooms", name: "Mixed Blooms", image: "/bouquets/graduation.jpg", line: "A little of everything." },
];

export const occasions = [
  { slug: "birthday", name: "Birthday", image: "/bouquets/pastel.jpg", line: "Make their day bloom.", note: "Colour, sweetness, a little surprise." },
  { slug: "anniversary", name: "Anniversary", image: "/bouquets/elegant-romance.jpg", line: "Celebrate your love.", note: "Roses, lilies, and quiet luxury." },
  { slug: "love", name: "Love & Romance", image: "/bouquets/classic-red.jpg", line: "Say it with flowers.", note: "For the feeling you cannot quite text." },
  { slug: "congratulations", name: "Congratulations", image: "/bouquets/graduation.jpg", line: "Honour the moment.", note: "Graduation, new roles, bright beginnings." },
  { slug: "just-because", name: "Just Because", image: "/bouquets/blue-sunshine.jpg", line: "No reason needed.", note: "Spontaneous, generous, a little wild." },
  { slug: "sympathy", name: "Sympathy", image: "/bouquets/tulip-bag.jpg", line: "With care, and quiet.", note: "Restrained arrangements, delivered gently." },
];

export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function related(slug: string) {
  const current = getProduct(slug);
  return products
    .filter((p) => p.slug !== slug && (p.collection === current?.collection || p.occasions.some((o) => current?.occasions.includes(o))))
    .slice(0, 4);
}
