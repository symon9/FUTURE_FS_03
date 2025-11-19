import { db } from "@/lib/firebase-admin";
import { Category } from "@/types";
import { DocumentData, QueryDocumentSnapshot } from "firebase-admin/firestore";

// A converter to ensure our data is strongly typed
const categoryConverter = {
  fromFirestore(snapshot: QueryDocumentSnapshot): Category {
    const data = snapshot.data() as DocumentData;
    return {
      id: snapshot.id,
      name: data.name,
      slug: data.slug,
    };
  },
  toFirestore(category: Category): DocumentData {
    const { id, ...data } = category;
    return data;
  },
};

/**
 * Fetches all categories from the Firestore database.
 * @returns A promise that resolves to an array of Category objects.
 */
export async function getCategories(): Promise<Category[]> {
  const categoriesRef = db.collection("categories").withConverter(categoryConverter);
  const snapshot = await categoriesRef.get();

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map((doc) => doc.data());
}
