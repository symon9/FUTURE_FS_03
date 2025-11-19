import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serviceAccount = require("../serviceAccountKey.json");

// Initialize the app with a unique name to avoid conflicts
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  if (!/already exists/.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

const db = admin.firestore();

const categories = [
  { name: "Ready to Wear", slug: "ready-to-wear" },
  { name: "Shoes", slug: "shoes" },
  { name: "Bags", slug: "bags" },
  { name: "Accessories", slug: "accessories" },
];

const products = [
  // -------------------------
  // FEATURED FIRST 8 (all categories)
  // -------------------------

  {
    name: "3B Sports Icon Tracksuit Jacket",
    price: 2050,
    slug: "tracksuit-jacket",
    category: "ready-to-wear",
    description: "A nylon tracksuit jacket with a foldable hood and sporty B artwork.",
    images: ["https://drive.google.com/uc?id=18iVH2S1kC71JrkovenUQ5_BCDFV-89LK"],
  },
  {
    name: "Runner Sneaker",
    price: 1150,
    slug: "runner-sneaker",
    category: "shoes",
    description: "A leather-free sneaker made of mesh and nylon in a worn-out effect.",
    images: ["https://drive.google.com/uc?id=1Lau1a0lWtkUQlfi5BR7wp3UVCT2ElTAN"],
  },
  {
    name: "Le Cagole XS Shoulder Bag",
    price: 2550,
    slug: "le-cagole-xs",
    category: "bags",
    description: "Arena lambskin shoulder bag with aged-silver hardware and a removable zipped pouch.",
    images: ["https://drive.google.com/uc?id=1QYlMGXd4MJNMC3_aV1hlbNLKYcVyLubv"],
  },
  {
    name: "Minimalist Wristwatch",
    price: 1250,
    slug: "minimalist-wristwatch",
    category: "accessories",
    description: "A luxury stainless steel wristwatch with sapphire glass and a minimal dial.",
    images: ["https://drive.google.com/uc?id=1C_2xrkX1W5kc80uobdK3-S2ey9Cj5_77"],
  },
  {
    name: "Essential Cotton Hoodie",
    price: 950,
    slug: "essential-cotton-hoodie",
    category: "ready-to-wear",
    description: "A heavyweight premium cotton hoodie with embroidered minimalist branding.",
    images: ["https://drive.google.com/uc?id=1EKYn5HxJHT2k4_xpzHwqMdpmCAuYhU55"],
  },
  {
    name: "Velocity Runner V2",
    price: 1380,
    slug: "velocity-runner-v2",
    category: "shoes",
    description: "A lightweight sneaker featuring a curved sole, breathable mesh, and shock-absorb cushioning.",
    images: ["https://drive.google.com/uc?id=1_dtEOvwS-w8UQZhDuBXRo61uG84nyMtC"],
  },
  {
    name: "Travel Duffle Pro",
    price: 2350,
    slug: "travel-duffle-pro",
    category: "bags",
    description: "A spacious high-end duffle bag with weather-resistant finish and multi-compartment design.",
    images: ["https://drive.google.com/uc?id=15QIRGZ0OqNrHFdgHh3-B_qWF629jKzk7"],
  },
  {
    name: "Aviator Sunglasses",
    price: 540,
    slug: "aviator-sunglasses",
    category: "accessories",
    description: "Classic aviator sunglasses featuring tinted anti-glare lenses and a stainless steel frame.",
    images: ["https://drive.google.com/uc?id=1yOtwRI7fmTEbnOaBNKyhiV4NbwgLdyaw"],
  },

  // -------------------------
  // THE REST (original order but after featured)
  // -------------------------

  {
    name: "Paris Moon T-Shirt Oversized",
    price: 825,
    slug: "paris-moon-tee",
    category: "ready-to-wear",
    description: "An oversized vintage jersey t-shirt with a striking Paris Moon print.",
    images: ["https://drive.google.com/uc?id=1GZZvJhRafRbJ3LPJBI_ZYysl0OiIzBD1"],
  },
  {
    name: "Urban Denim Jacket",
    price: 1800,
    slug: "urban-denim-jacket",
    category: "ready-to-wear",
    description: "A structured washed-denim jacket with metal hardware and reinforced stitching.",
    images: ["https://drive.google.com/uc?id=1tPWJstPRbQtK-1Q4njfEt9eeafECQ3cj"],
  },
  {
    name: "Relaxed Fit Cargo Pants",
    price: 1300,
    slug: "relaxed-cargo-pants",
    category: "ready-to-wear",
    description: "Utility cargo pants with multiple pockets, adjustable straps, and a relaxed silhouette.",
    images: ["https://drive.google.com/uc?id=1M-l0a3Of2toOf7auKyHqFDhlde3tESmS"],
  },
  {
    name: "Signature Logo Sweatshirt",
    price: 780,
    slug: "signature-logo-sweatshirt",
    category: "ready-to-wear",
    description: "A soft fleece sweatshirt featuring the brand’s embossed signature logo.",
    images: ["https://drive.google.com/uc?id=1bL5EQvDDYtnqdXZI90CPH1OoK7M7XFMu"],
  },

  {
    name: "Classic Leather Low",
    price: 1100,
    slug: "classic-leather-low",
    category: "shoes",
    description: "Low-top leather sneakers crafted with smooth premium hide and reinforced stitching.",
    images: ["https://drive.google.com/uc?id=1B49OmgEf9keEodduPc_N4IeCgY7EqbYf"],
  },
  {
    name: "Trail-X Outdoor Boot",
    price: 1990,
    slug: "trail-x-boot",
    category: "shoes",
    description: "A rugged outdoor boot with waterproof coating and high-grip rubber sole.",
    images: ["https://drive.google.com/uc?id=1J07Zrs43BE9EwRroSMQsGekee7iBX6Ag"],
  },
  {
    name: "Slip-On Comfort Mule",
    price: 620,
    slug: "comfort-mule",
    category: "shoes",
    description: "Minimalist slip-on mule featuring soft foam cushioning and a sculpted base.",
    images: ["https://drive.google.com/uc?id=158i8isyM2MdaaNwzGJd8xnszqS6zLbtS"],
  },
  {
    name: "Balenciaga Speed Trainer",
    price: 1250,
    slug: "balenciaga-speed-trainer",
    category: "shoes",
    description: "A premium trainer with a sleek design and a durable rubber sole.",
    images: ["https://drive.google.com/uc?id=1KCorDtW80TQHPG-DJWqEPflfIVLXW07q"],
  },

  {
    name: "Mini Crossbody Utility Bag",
    price: 980,
    slug: "utility-crossbody",
    category: "bags",
    description: "Compact crossbody bag with zip compartments, adjustable strap, and a minimal silhouette.",
    images: ["https://drive.google.com/uc?id=1hT_v8nDIoGtMWi_XeU9Sm6wgGphzC470"],
  },
  {
    name: "Structured Tote Bag",
    price: 1650,
    slug: "structured-tote",
    category: "bags",
    description: "A large structured tote bag made from reinforced vegan leather with metal accents.",
    images: ["https://drive.google.com/uc?id=1vtsxg4MwKayd0WYV2Z-lIgDdQ3Q_pWL0"],
  },
  {
    name: "Foldover Clutch",
    price: 850,
    slug: "foldover-clutch",
    category: "bags",
    description: "A slim foldover clutch with magnetic closure and polished metallic edges.",
    images: ["https://drive.google.com/uc?id=189hT5MpAen6fqJ2jtIB3zyht0KpmQcEP"],
  },

  {
    name: "Leather Buckle Belt",
    price: 380,
    slug: "leather-buckle-belt",
    category: "accessories",
    description: "A full-grain leather belt with polished buckle and designer-engraved detailing.",
    images: ["https://drive.google.com/uc?id=1sJtwB5bH9RFLU4m8S7slcfYNmskfWkMS"],
  },
  {
    name: "Everyday Canvas Cap",
    price: 290,
    slug: "canvas-cap",
    category: "accessories",
    description: "A breathable canvas baseball cap with adjustable strap and embroidered logo.",
    images: ["https://drive.google.com/uc?id=15wapxwTW1qE73HXIx8puMFCG4kG1cJpn"],
  },
  {
    name: "Leather Card Holder",
    price: 320,
    slug: "leather-card-holder",
    category: "accessories",
    description: "A premium leather card holder with multiple compartments and a sleek design.",
    images: ["https://drive.google.com/uc?id=1Xoq_kqh-OlMd6XXnUT0eOXlY09HJoNSq"],
  },
];

async function seedDatabase() {
  console.log("Starting to seed database...");
  const categoriesCollection = db.collection("categories");
  const productsCollection = db.collection("products");

  const batch = db.batch();

  // Add categories
  categories.forEach((category) => {
    const docRef = categoriesCollection.doc(category.slug);
    batch.set(docRef, category);
  });
  console.log("Categories queued for batch write.");

  // Add products
  products.forEach((product) => {
    const docRef = productsCollection.doc(product.slug);
    batch.set(docRef, product);
  });
  console.log("Products queued for batch write.");

  await batch.commit();
  console.log("✅ Database seeded successfully!");
}

seedDatabase().catch(console.error);
