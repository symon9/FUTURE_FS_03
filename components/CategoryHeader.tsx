"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { CategoryWithMedia } from "@/config/categories";

interface CategoryHeaderProps {
  category: CategoryWithMedia;
  productCount: number;
}

export function CategoryHeader({ category, productCount }: CategoryHeaderProps) {
  const headerRef = useRef<HTMLHeadElement>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(header.querySelector("video"), {
        opacity: 0,
        duration: 1.5,
        ease: "power3.inOut",
      });

      tl.from(
        header.querySelectorAll("[data-animate-text]"),
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
        },
        "-=1.0"
      );
    }, headerRef);

    return () => ctx.revert();
  }, [category]);

  return (
    <header
      ref={headerRef}
      className="w-full lg:w-1/3 h-64 lg:h-screen lg:sticky top-0 p-8 lg:p-12 flex flex-col justify-end bg-black"
    >
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <video
          key={category.videoSrc}
          src={category.videoSrc}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 filter blur-md"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10">
        <h1 data-animate-text className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white">
          {category.name}
        </h1>
        <p data-animate-text className="text-xs text-foreground-muted uppercase tracking-widest mt-2">
          {productCount} Items
        </p>
      </div>
    </header>
  );
}
