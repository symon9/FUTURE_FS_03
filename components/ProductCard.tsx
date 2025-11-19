import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
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
