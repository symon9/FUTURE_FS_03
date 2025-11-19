import { db } from "@/lib/firebase-admin";
import { Product } from "@/types"; // Import our new type
import { DocumentData, QueryDocumentSnapshot } from "firebase-admin/firestore";

// A Firestore converter
const productConverter = {
  fromFirestore(snapshot: QueryDocumentSnapshot): Product {
    const data = snapshot.data() as DocumentData;
    return {
      id: snapshot.id,
      name: data.name,
      price: data.price,
      slug: data.slug,
      images: data.images,
    };
  },
  toFirestore(product: Product): DocumentData {
    const { id, ...data } = product;
    return data;
  },
};

/**
 * Fetches all products from the Firestore database.
 * @returns A promise that resolves to an array of Product objects.
 */
export async function getProducts(): Promise<Product[]> {
  const productsRef = db.collection("products").withConverter(productConverter);
  const snapshot = await productsRef.get();

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map((doc) => doc.data());
}
