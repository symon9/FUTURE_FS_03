"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { name, price, slug, images } = product;
  const imageUrl = images?.[0] || "/placeholder.jpg";

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link href={`/product/${slug}`} className="group relative cursor-pointer">
        <div className="relative w-full aspect-3/4 overflow-hidden bg-neutral-900">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className={`object-cover object-center transition-transform duration-700 ease-out ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          <div
            className={`absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Quick View
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="flex justify-between items-start">
            <h3 className="text-sm uppercase tracking-wider text-foreground pr-4 leading-relaxed">{name}</h3>
            <p className="text-sm font-bold text-black">${price.toLocaleString()}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
