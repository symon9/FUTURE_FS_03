import Link from "next/link";
import { Product } from "@/types";
import Image from "next/image";
import { db } from "@/lib/firebase-admin";
import { notFound } from "next/navigation";

async function getCategoryData(slug: string) {
  const categorySnapshot = await db.collection("categories").where("slug", "==", slug).limit(1).get();

  if (categorySnapshot.empty) {
    return null;
  }
  const categoryData = categorySnapshot.docs[0].data();

  const productSnapshot = await db.collection("products").where("category", "==", slug).get();
  const productList = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];

  return { name: categoryData.name, products: productList };
}

function ProductCard({ product }: { product: Product }) {
  const { name, price, slug, images } = product;
  const imageUrl = images?.[0] || "/placeholder.jpg";

  return (
    <Link href={`/product/${slug}`} className="group">
      <div className="aspect-3/4 w-full overflow-hidden bg-neutral-900">
        <Image
          src={imageUrl}
          alt={name}
          width={800}
          height={1067}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-foreground">{name}</h3>
        </div>
        <p className="text-sm font-medium text-primary">${price}</p>
      </div>
    </Link>
  );
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const categoryData = await getCategoryData(resolvedParams.slug);

  if (!categoryData) {
    notFound();
  }

  const { name, products } = categoryData;

  return (
    <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase">{name}</h1>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-foreground-muted">No products found in this category.</p>
      )}
    </div>
  );
}
