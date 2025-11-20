"use client";

import { useState, useMemo } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Product } from "@/types";
import { FILTERS } from "@/config/filters";
import { useStaggeredGrid } from "@/hooks/useStaggeredGrid";
import { ProductCard } from "./ProductCard";

interface ProductGridSectionProps {
  products: Product[];
}

const ITEMS_PER_PAGE = 8;

export function ProductGridSection({ products }: ProductGridSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Filter products based on active category
  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") return products;
    return products.filter((p) => p.category === activeFilter);
  }, [activeFilter, products]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const handleFilterChange = (slug: string) => {
    setActiveFilter(slug);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  // GSAP Animation for grid items using our hook
  const containerRef = useStaggeredGrid([visibleProducts]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <section className="bg-background relative z-10 border-t border-black/10 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        {/* --- STICKY FILTER HEADER --- */}
        <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-md py-4 mb-12 border-b border-black/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">Latest Arrivals</h2>
              <p className="text-xs text-foreground-muted uppercase tracking-widest mt-1">
                {filteredProducts.length} Items
              </p>
            </div>

            <div className="flex items-center gap-8 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              <div className="flex items-center gap-6">
                {FILTERS.map((filter) => (
                  <button
                    key={filter.slug}
                    onClick={() => handleFilterChange(filter.slug)}
                    className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative ${
                      activeFilter === filter.slug ? "text-black" : "text-neutral-500 hover:text-black"
                    }`}
                  >
                    {filter.name}
                    {activeFilter === filter.slug && (
                      <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-black" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div
          ref={containerRef}
          className="grid gap-y-12 gap-x-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {visibleProducts.map((product) => (
            <div key={product.id} className="product-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* --- LOAD MORE --- */}
        {visibleCount < filteredProducts.length && (
          <div className="mt-24 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:text-neutral-400 transition-colors"
            >
              Load More
              <span className="group-hover:translate-x-2 transition-transform duration-300">
                <FiArrowRight />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
