import { db } from "@/lib/firebase-admin";
import { Product } from "@/types";
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
      category: data.category,
      images: data.images,
      description: data.description,
    };
  },
  toFirestore(product: Product): DocumentData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
