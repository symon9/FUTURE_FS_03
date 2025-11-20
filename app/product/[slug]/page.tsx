import { db } from "@/lib/firebase-admin";
import { getProducts } from "@/lib/services/productService";
import { DocumentData, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { notFound } from "next/navigation";
import { ProductDetailsClient } from "@/components/product-details-client";

interface Product {
  id: string;
  name: string;
  price: number;
  slug: string;
  category: string;
  description: string;
  images: string[];
}

// The Firestore converter
const productConverter = {
  toFirestore(product: Product): DocumentData {
    const { id, ...data } = product;
    return data;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Product {
    const data = snapshot.data()!;
    return {
      id: snapshot.id,
      name: data.name,
      price: data.price,
      slug: data.slug,
      category: data.category,
      description: data.description,
      images: data.images,
    };
  },
};

async function getProduct(slug: string): Promise<Product | null> {
  if (!slug) return null;

  const productsRef = db.collection("products").withConverter(productConverter);
  const querySnapshot = await productsRef.where("slug", "==", slug).limit(1).get();

  if (querySnapshot.empty) {
    return null;
  }
  return querySnapshot.docs[0].data();
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  
  // Filter out current product and products from the same category
  const candidates = allProducts.filter(
    (p) => p.id !== product.id && p.category !== product.category
  );

  const relatedProducts: Product[] = [];
  const usedCategories = new Set<string>();

  // First pass: try to get products from different categories
  for (const p of candidates) {
    if (relatedProducts.length >= 3) break;
    if (!usedCategories.has(p.category)) {
      relatedProducts.push(p);
      usedCategories.add(p.category);
    }
  }

  // Second pass: fill up to 3 if we don't have enough unique categories
  if (relatedProducts.length < 3) {
    for (const p of candidates) {
      if (relatedProducts.length >= 3) break;
      if (!relatedProducts.some((rp) => rp.id === p.id)) {
        relatedProducts.push(p);
      }
    }
  }

  return <ProductDetailsClient product={product} relatedProducts={relatedProducts} />;
}
