"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { Accordion } from "./Accordion";
import ReactMarkdown from "react-markdown";
import { gsap } from "gsap";
import Link from "next/link";

export function ProductDetailsClient({ product, relatedProducts }: { product: Product; relatedProducts: Product[] }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const imageGalleryRef = useRef<HTMLDivElement>(null);
  const addToBagBtnRef = useRef<HTMLButtonElement>(null);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    if (isAdding || !addToBagBtnRef.current) return;

    setIsAdding(true);
    const btn = addToBagBtnRef.current;
    const idleText = btn.querySelector(".idle-text");
    const addingText = btn.querySelector(".adding-text");

    const tl = gsap.timeline();
    tl.to(idleText, { y: "-150%", duration: 0.5, ease: "power3.in" }).fromTo(
      addingText,
      { y: "150%" },
      { y: "0%", duration: 0.5, ease: "power3.out" },
      "-=0.4"
    );

    setTimeout(() => {
      setIsAdding(false);
      gsap
        .timeline()
        .to(addingText, { y: "150%", duration: 0.5, ease: "power3.in" })
        .to(idleText, { y: "0%", duration: 0.5, ease: "power3.out" }, "-=0.4");
    }, 2000);
  };

  useLayoutEffect(() => {
    if (!imageGalleryRef.current) return;
    const images = gsap.utils.toArray<HTMLElement>(imageGalleryRef.current.children);
    gsap.from(images, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
    });
  }, []);

  const sizes = ["XS", "S", "M", "L", "XL"];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="grid lg:grid-cols-2 lg:gap-x-16">
        <div className="w-full">
          <div ref={imageGalleryRef} className="lg:sticky top-24 grid grid-cols-1 gap-y-8">
            {product.images?.map((imgUrl, index) => (
              <div key={index} className="aspect-3/4 bg-neutral-900">
                <Image
                  src={imgUrl}
                  alt={`${product.name} image ${index + 1}`}
                  width={1200}
                  height={1600}
                  className="w-full h-full object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mt-12 lg:mt-0">
          <div className="lg:sticky top-24">
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase">{product.name}</h1>
            <p className="text-3xl mt-4">${product.price.toLocaleString()}</p>

            <div className="mt-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Select Size</h3>
              <div className="flex gap-2 mt-4">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center text-sm font-bold border transition-colors duration-200 ${
                      selectedSize === size
                        ? "bg-white text-black border-white"
                        : "border-neutral-700 hover:border-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              ref={addToBagBtnRef}
              onClick={handleAddToCart}
              className="relative w-full mt-8 bg-primary text-background py-4 text-base font-bold uppercase tracking-widest flex items-center justify-center overflow-hidden"
              disabled={isAdding}
            >
              <span className="idle-text inline-block text-gray-800">ADD TO BAG</span>
              <span className="adding-text absolute inline-block translate-y-[150%] text-gray-800">ADDING...</span>
            </button>

            <div className="mt-8">
              <Accordion title="Description">
                <ReactMarkdown>{product.description}</ReactMarkdown>
              </Accordion>
              <Accordion title="Shipping & Returns">
                <p>
                  Complimentary express shipping on all orders. Please note, delivery times may be longer than usual.
                </p>
                <p className="mt-4">You can return any order within 14 days of the delivery date.</p>
              </Accordion>
              <Accordion title="Materials">
                <p>Composition: 100% Premium Cotton</p>
                <p>Product ID: 612966TIV541070</p>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 lg:mt-32 border-t border-neutral-800 pt-16">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-center">Complete The Look</h2>
        <div className="mt-12 grid grid-cols-3 gap-x-6 gap-y-12">
          {relatedProducts.map((item) => (
            <Link href={`/product/${item.slug}`} key={item.id} className="group">
              <div className="aspect-3/4 bg-neutral-900 overflow-hidden">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={800}
                  height={1067}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-sm uppercase tracking-wider">{item.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
