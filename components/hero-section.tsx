"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const heroImages = [
  {
    src: "https://drive.google.com/uc?id=18iVH2S1kC71JrkovenUQ5_BCDFV-89LK",
    alt: "Model in a tracksuit jacket",
  },
  {
    src: "https://drive.google.com/uc?id=1Lau1a0lWtkUQlfi5BR7wp3UVCT2ElTAN",
    alt: "Close up of a Runner Sneaker",
  },
  {
    src: "https://drive.google.com/uc?id=1QYlMGXd4MJNMC3_aV1hlbNLKYcVyLubv",
    alt: "Model holding a Le Cagole bag",
  },
];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            fill
            className={`
              object-cover object-center w-full h-full transition-opacity duration-1000 ease-in-out
              ${currentImageIndex === index ? "opacity-100" : "opacity-0"}
            `}
            priority={index === 0}
          />
        ))}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Foreground Text and CTA Container */}
      <div className="relative z-10 text-center text-white p-4">
        <div className="overflow-hidden">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter animate-reveal">
            AUTUMN 25
          </h1>
        </div>
        <div className="overflow-hidden mt-4">
          <p className="text-lg md:text-xl font-medium uppercase tracking-[0.3em] animate-reveal [animation-delay:200ms]">
            The Collection
          </p>
        </div>
        <div className="mt-8 animate-reveal [animation-delay:400ms]">
          <Link
            href="/category/ready-to-wear"
            className="inline-block bg-primary text-background py-3 px-10 text-sm font-bold uppercase tracking-widest transition-transform hover:scale-105"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </section>
  );
}
