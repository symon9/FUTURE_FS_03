"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { BackgroundVideo } from "./Bg-video";

const magneticImageSrc = "/magnetic-hero-image.png";

export function MagneticHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const imageWrapper = imageWrapperRef.current;
    if (!hero || !imageWrapper) return;

    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(imageWrapper, "x", {
        duration: 0.8,
        ease: "power3",
      });
      const yTo = gsap.quickTo(imageWrapper, "y", {
        duration: 0.8,
        ease: "power3",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        xTo(clientX);
        yTo(clientY);
      };

      const handleMouseEnter = () => {
        gsap.to(imageWrapper, { scale: 1, duration: 0.5, ease: "power3.out" });
      };

      const handleMouseLeave = () => {
        gsap.to(imageWrapper, { scale: 0, duration: 0.5, ease: "power3.out" });
      };

      hero.addEventListener("mousemove", handleMouseMove);
      hero.addEventListener("mouseenter", handleMouseEnter);
      hero.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        hero.removeEventListener("mousemove", handleMouseMove);
        hero.removeEventListener("mouseenter", handleMouseEnter);
        hero.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full bg-black overflow-hidden cursor-none">
      {/* --- LAYER 0: The New Floating Particles Background --- */}
      <BackgroundVideo />

      {/* --- LAYER 1: The Moving Image Spotlight (no change) --- */}
      <div
        ref={imageWrapperRef}
        className="absolute top-0 left-0 w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] scale-0 rounded-full z-10 overflow-hidden"
        style={{ x: "-50%", y: "-50%" }}
      >
        <Image src={magneticImageSrc} alt="" fill className="object-cover" priority />
      </div>

      {/* --- LAYER 2: The Text Stencil (no change) --- */}
      <div className="relative z-20 w-full h-full flex items-center justify-center pointer-events-none">
        <h1
          className="
            text-7xl md:text-9xl lg:text-[12rem] font-black uppercase tracking-tighter 
            p-4 text-center leading-none text-white
            mix-blend-screen
          "
        >
          Redefined
          <br />
          Couture
        </h1>
      </div>
    </section>
  );
}
