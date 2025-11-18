import { db } from "@/lib/firebase-admin";
import { DocumentData, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { notFound } from "next/navigation";
import { ProductDetailsClient } from "@/components/product-details-client";

// The Product interface (no change)
interface Product {
  id: string;
  name: string;
  price: number;
  slug: string;
  category: string;
  description: string;
  images: string[];
}

// The Firestore converter (no change)
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

// The data fetching function (no change)
async function getProduct(slug: string): Promise<Product | null> {
  // This check prevents Firestore from receiving an undefined value
  if (!slug) return null;

  const productsRef = db.collection("products").withConverter(productConverter);
  const querySnapshot = await productsRef
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (querySnapshot.empty) {
    return null;
  }
  return querySnapshot.docs[0].data();
}

// --- This is the PURE Server Component with the FINAL FIX ---
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Type can hint it's a promise

  // --- THE FIX ---
  // Await the params promise to get the actual slug value
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
