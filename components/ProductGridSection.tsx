import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridSectionProps {
  products: Product[];
}

export function ProductGridSection({ products }: ProductGridSectionProps) {
  return (
    <div className="bg-background relative z-10">
      <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-black tracking-tighter uppercase">
            Shop The Collection
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {/* We check if products exist before mapping for robustness */}
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            // A graceful message if no products are found
            <p className="col-span-full text-center text-foreground-muted">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
