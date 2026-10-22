// ---------------------------------------------------------------------------
// Mock product data — the single source of truth for the catalog until real
// inventory, descriptions and prices are provided. Swap the reads below for
// Supabase queries and the rest of the app keeps working unchanged.
//
// Every entry is a clearly-marked demonstration placeholder. Display names are
// colour-based rather than claiming a specific weave, and the four stock-photo
// products are flagged `demo` so they cannot be added to the bag or checked
// out. See stock-photo-sources.json for image credits.
// ---------------------------------------------------------------------------

export type Availability = "in-stock" | "low-stock" | "sold-out" | "demo";
export type Category = "festive" | "traditional" | "new";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number; // selling price in INR
  shortDescription: string;
  description: string;
  fabric: string;
  color: string;
  category: Category;
  availability: Availability;
  images: string[]; // portrait photography, multiple views where available
  featured?: boolean;
};

export type Collection = {
  id: "all" | Category;
  name: string;
  tagline: string;
  image: string;
};

/**
 * Number of gallery images that actually exist on disk for each demo product.
 * The first four sets ship with three shots; the four stock-photo demos have a
 * single image. The gallery only ever references files that are present, so no
 * broken image references can appear.
 */
const imageCount: Record<string, number> = {
  "banarasi-maroon": 3,
  "kanjivaram-emerald": 3,
  "paithani-peacock": 3,
  "banarasi-rose-gold": 3,
  "chanderi-blush": 1,
  "georgette-sapphire": 1,
  "handloom-indigo": 1,
  "organza-ivory": 1,
};

/** Portrait photography for a product — only the files that exist on disk. */
function productImages(slug: string): string[] {
  const count = imageCount[slug] ?? 0;
  return Array.from(
    { length: count },
    (_, i) => `/images/products/${slug}-${i + 1}.jpg`,
  );
}

export const collections: Collection[] = [
  {
    id: "all",
    name: "All Sarees",
    tagline: "The complete edit",
    image: "/images/products/banarasi-rose-gold-1.jpg",
  },
  {
    id: "festive",
    name: "Festive Edit",
    tagline: "Made for celebration",
    image: "/images/products/georgette-sapphire-1.jpg",
  },
  {
    id: "traditional",
    name: "Traditional Elegance",
    tagline: "Timeless classics",
    image: "/images/products/kanjivaram-emerald-1.jpg",
  },
  {
    id: "new",
    name: "New Arrivals",
    tagline: "Fresh from the loom",
    image: "/images/products/organza-ivory-1.jpg",
  },
];

export const products: Product[] = [
  {
    id: "p-banarasi-maroon",
    slug: "banarasi-maroon",
    name: "Deep Maroon Saree",
    price: 8900,
    shortDescription:
      "A rich deep-maroon saree with subtle gold detailing.",
    description:
      "A deep-maroon saree with understated gold accents — a timeless choice for weddings and celebrations. A demonstration piece in our prototype collection; the exact weave, fabric and finishing will be confirmed against real inventory before launch. Includes a running blouse piece.",
    fabric: "Handcrafted Saree",
    color: "Deep Maroon",
    category: "traditional",
    availability: "in-stock",
    images: productImages("banarasi-maroon"),
    featured: true,
  },
  {
    id: "p-kanjivaram-emerald",
    slug: "kanjivaram-emerald",
    name: "Emerald Green Saree",
    price: 12500,
    shortDescription:
      "A lustrous emerald-green saree with a refined border.",
    description:
      "An emerald-green saree with a refined border and a graceful, structured drape — a classic for weddings and formal gatherings. A demonstration piece in our prototype collection; the exact weave, fabric and finishing will be confirmed against real inventory before launch. Includes a running blouse piece.",
    fabric: "Handcrafted Saree",
    color: "Emerald Green",
    category: "traditional",
    availability: "in-stock",
    images: productImages("kanjivaram-emerald"),
    featured: true,
  },
  {
    id: "p-paithani-peacock",
    slug: "paithani-peacock",
    name: "Peacock Teal Saree",
    price: 15900,
    shortDescription:
      "A peacock-teal saree with richly detailed weaving.",
    description:
      "A peacock-teal saree with richly detailed weaving across the body and pallu. A demonstration piece in our prototype collection; the exact weave, fabric and finishing will be confirmed against real inventory before launch. Includes a running blouse piece.",
    fabric: "Handcrafted Saree",
    color: "Peacock Teal",
    category: "traditional",
    availability: "low-stock",
    images: productImages("paithani-peacock"),
    featured: false,
  },
  {
    id: "p-banarasi-rose-gold",
    slug: "banarasi-rose-gold",
    name: "Yellow-Pink Saree",
    price: 9750,
    shortDescription:
      "A warm yellow-pink saree with soft golden accents.",
    description:
      "A warm yellow-pink saree with soft golden accents — a lighter take on festive dressing. A demonstration piece in our prototype collection; the exact weave, fabric and finishing will be confirmed against real inventory before launch. Includes a running blouse piece.",
    fabric: "Handcrafted Saree",
    color: "Yellow-Pink",
    category: "festive",
    availability: "in-stock",
    images: productImages("banarasi-rose-gold"),
    featured: true,
  },
  {
    id: "p-chanderi-blush",
    slug: "chanderi-blush",
    name: "Blush Pink Saree",
    price: 3900,
    shortDescription:
      "A soft blush-pink saree for daytime occasions.",
    description:
      "A soft blush-pink saree, light and graceful for daytime. Demo product — shown with a stock photograph for the prototype only, and not available to purchase yet. Final fabric, weave and availability to be confirmed before launch.",
    fabric: "Handcrafted Saree",
    color: "Blush Pink",
    category: "new",
    availability: "demo",
    images: productImages("chanderi-blush"),
    featured: true,
  },
  {
    id: "p-georgette-sapphire",
    slug: "georgette-sapphire",
    name: "Sapphire Blue Saree",
    price: 6250,
    shortDescription:
      "A sapphire-blue saree that catches the light at evening events.",
    description:
      "A sapphire-blue saree with a flowing fall, made for evening occasions. Demo product — shown with a stock photograph for the prototype only, and not available to purchase yet. Final fabric, weave and availability to be confirmed before launch.",
    fabric: "Handcrafted Saree",
    color: "Sapphire Blue",
    category: "festive",
    availability: "demo",
    images: productImages("georgette-sapphire"),
    featured: false,
  },
  {
    id: "p-handloom-indigo",
    slug: "handloom-indigo",
    name: "Deep Purple Saree",
    price: 2650,
    shortDescription:
      "A deep purple saree with gold-toned detailing.",
    description:
      "A deep purple saree with gold-toned detailing, easy to drape for everyday elegance. Demo product — shown with a stock photograph for the prototype only, and not available to purchase yet. Final fabric, weave and availability to be confirmed before launch.",
    fabric: "Handcrafted Saree",
    color: "Deep Purple",
    category: "new",
    availability: "demo",
    images: productImages("handloom-indigo"),
    featured: false,
  },
  {
    id: "p-organza-ivory",
    slug: "organza-ivory",
    name: "Ivory Saree",
    price: 7400,
    shortDescription:
      "A crisp ivory saree with a soft, airy fall.",
    description:
      "A crisp ivory saree with a soft, airy fall — a versatile base for festive or daytime styling. Demo product — shown with a stock photograph for the prototype only, and not available to purchase yet. Final fabric, weave and availability to be confirmed before launch.",
    fabric: "Handcrafted Saree",
    color: "Ivory",
    category: "new",
    availability: "demo",
    images: productImages("organza-ivory"),
    featured: false,
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (p) => p.id !== product.id && p.category === product.category,
  );
  const others = products.filter(
    (p) => p.id !== product.id && p.category !== product.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export const categoryLabel: Record<Category, string> = {
  festive: "Festive Edit",
  traditional: "Traditional Elegance",
  new: "New Arrivals",
};

export const availabilityLabel: Record<Availability, string> = {
  "in-stock": "In stock",
  "low-stock": "Only a few left",
  "sold-out": "Sold out",
  demo: "Demo",
};

/** Products that can be added to the bag and taken through checkout. */
export function isPurchasable(product: Product): boolean {
  return product.availability !== "sold-out" && product.availability !== "demo";
}
