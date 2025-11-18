"use client"; // This is the crucial directive

import Image from "next/image";
import ReactMarkdown from "react-markdown";

// Define the Product type so this component knows what data to expect
interface Product {
  id: string;
  name: string;
  price: number;
  slug: string;
  category: string;
  description: string;
  images: string[];
}

// A simple button component
function AddToBagButton() {
  return (
    <button className="w-full mt-8 bg-primary text-background py-4 text-base font-bold uppercase tracking-widest transition-opacity hover:opacity-80">
      Add to Bag
    </button>
  );
}

// This component handles ALL UI rendering for the product page
export function ProductDetailsClient({ product }: { product: Product }) {
  const { name, price, description, images } = product;

  return (
    <div className="container mx-auto px-6 lg:px-8 py-16">
      <div className="grid lg:grid-cols-2 lg:gap-x-16">
        {/* Image Gallery Column */}
        <div className="flex flex-col gap-y-8">
          {images?.map((imgUrl: string, index: number) => (
            <div key={index} className="aspect-[3/4] bg-neutral-900">
              <Image
                src={imgUrl}
                alt={`${name} image ${index + 1}`}
                width={1200}
                height={1600}
                className="w-full h-full object-cover object-center"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Product Info Column (Sticky) */}
        <div className="lg:sticky top-32 h-fit mt-12 lg:mt-0">
          <h1 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase">
            {name}
          </h1>
          <p className="text-3xl mt-4">${price.toLocaleString()}</p>
          <div className="prose prose-invert mt-6 max-w-none">
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
          <AddToBagButton />
        </div>
      </div>
    </div>
  );
}
