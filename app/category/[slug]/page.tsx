import { notFound } from "next/navigation";
import { db } from "@/lib/firebase-admin";
import { Product } from "@/types";
import { mainCategories } from "@/config/categories";
import { CategoryClientUI } from "@/components/CategoryClientUI";

async function getCategoryData(slug: string) {
  const categoryDetails = mainCategories.find((cat) => cat.slug === slug);

  if (!categoryDetails) {
    return null;
  }

  const productSnapshot = await db.collection("products").where("category", "==", slug).get();
  const productList = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];

  return { category: categoryDetails, products: productList };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await getCategoryData(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  const { category, products } = data;

  return <CategoryClientUI category={category} products={products} />;
}
