import { db } from "@/lib/firebase-admin";
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

  return <ProductDetailsClient product={product} />;
}
