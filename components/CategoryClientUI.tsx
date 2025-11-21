"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { CategoryWithMedia } from "@/config/categories";
import { CategoryHeader } from "./CategoryHeader";

interface CategoryClientUIProps {
  category: CategoryWithMedia;
  products: Product[];
}

export function CategoryClientUI({ category, products }: CategoryClientUIProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!gridRef.current || products.length === 0) return;

    const grid = gridRef.current;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(grid.children);
      gsap.from(items, { opacity: 0, y: 30, duration: 0.5, ease: "power2.out", stagger: 0.1 });
    }, gridRef);
    return () => ctx.revert();
  }, [products]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <CategoryHeader category={category} productCount={products.length} />

      <main className="w-full lg:w-2/3 lg:pl-12 py-16 px-4">
        <div className="container mx-auto">
          {products.length > 0 ? (
            <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-600">No products found in this category.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
