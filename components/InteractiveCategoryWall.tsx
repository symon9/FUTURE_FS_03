"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";

interface InteractiveCategoryWallProps {
  categories: Category[];
}

export function InteractiveCategoryWall({ categories }: InteractiveCategoryWallProps) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const categoriesWithImages = categories.filter(
    (category): category is Category & { imageSrc: string } => !!category.imageSrc
  );

  return (
    <section className="relative w-full h-screen bg-black" onMouseLeave={() => setActiveCategory(null)}>
      <div className="absolute inset-0 w-full h-full z-0">
        {categoriesWithImages.map((category) => (
          <Image
            key={category.id}
            src={category.imageSrc}
            alt={category.name}
            fill
            className={`
              object-cover w-full h-full
              transition-opacity duration-700 ease-in-out
              ${activeCategory?.id === category.id ? "opacity-100" : "opacity-0"}
            `}
          />
        ))}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full h-full">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="group relative flex items-center justify-center p-8 border-t border-r border-white/10"
            onMouseEnter={() => setActiveCategory(category)}
          >
            <h2
              className={`
                text-4xl md:text-6xl font-black uppercase tracking-tighter text-center
                transition-colors duration-500
                ${activeCategory && activeCategory.id !== category.id ? "text-primary" : "text-gray-200"}
              `}
            >
              {category.name}
            </h2>

            <div
              className={`
              absolute inset-0 w-full h-full bg-cover bg-center
              transition-transform duration-4000ms ease-out
              ${activeCategory?.id === category.id ? "scale-105" : "scale-100"}
            `}
              style={{ backgroundImage: `url(${category.imageSrc})` }}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
