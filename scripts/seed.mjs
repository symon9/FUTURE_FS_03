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
  {
    name: "3B Sports Icon Tracksuit Jacket",
    price: 2050,
    slug: "tracksuit-jacket",
    category: "ready-to-wear",
    description:
      "A nylon tracksuit jacket with a foldable hood and sporty B artwork.",
    images: [
      "https://drive.google.com/uc?id=18iVH2S1kC71JrkovenUQ5_BCDFV-89LK",
    ],
  },
  {
    name: "Paris Moon T-Shirt Oversized",
    price: 825,
    slug: "paris-moon-tee",
    category: "ready-to-wear",
    description:
      "An oversized vintage jersey t-shirt with a striking Paris Moon print.",
    images: [
      "https://drive.google.com/uc?id=1GZZvJhRafRbJ3LPJBI_ZYysl0OiIzBD1",
    ],
  },
  {
    name: "Runner Sneaker",
    price: 1150,
    slug: "runner-sneaker",
    category: "shoes",
    description:
      "A leather-free sneaker made of mesh and nylon in a worn-out effect.",
    images: [
      "https://drive.google.com/uc?id=1Lau1a0lWtkUQlfi5BR7wp3UVCT2ElTAN",
    ],
  },
  {
    name: "Le Cagole XS Shoulder Bag",
    price: 2550,
    slug: "le-cagole-xs",
    category: "bags",
    description:
      "Arena lambskin shoulder bag with aged-silver hardware and a removable zipped pouch.",
    images: [
      "https://drive.google.com/uc?id=1QYlMGXd4MJNMC3_aV1hlbNLKYcVyLubv",
    ],
  },
];

async function seedDatabase() {
  console.log("Starting to seed database...");
  const categoriesCollection = db.collection("categories");
  const productsCollection = db.collection("products");

  // Firestore batch writes are more efficient
  const batch = db.batch();

  categories.forEach((category) => {
    const docRef = categoriesCollection.doc(category.slug);
    batch.set(docRef, category);
  });
  console.log("Categories queued for batch write.");

  products.forEach((product) => {
    const docRef = productsCollection.doc(product.slug);
    batch.set(docRef, product);
  });
  console.log("Products queued for batch write.");

  await batch.commit();
  console.log("✅ Database seeded successfully!");
}

seedDatabase().catch(console.error);
