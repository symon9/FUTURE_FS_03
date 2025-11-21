"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Scene {
  id: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
  layout?: "text-left" | "text-right";
}

interface HorizontalGalleryProps {
  scenes: Scene[];
}

export function HorizontalGallery({ scenes }: HorizontalGalleryProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const component = componentRef.current;
    const track = trackRef.current;
    if (!component || !track) return;

    // --- RESPONSIVE LOGIC WITH GSAP's matchMedia ---
    const mm = gsap.matchMedia(component);

    mm.add("(min-width: 1024px)", () => {
      if (scenes.length <= 1) return;

      const amountToScroll = track.offsetWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: -amountToScroll,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: component,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${amountToScroll}`,
        animation: tween,
        invalidateOnRefresh: true,
      });

      // Desktop-only parallax animations
      gsap.utils.toArray<HTMLElement>(".scene-panel").forEach((panel) => {
        const image = panel.querySelector(".scene-image");
        const text = panel.querySelector(".scene-text");

        gsap.to(image, {
          x: 50,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            scrub: 1.5,
          },
        });

        gsap.to(text, {
          x: -50,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            scrub: 1.5,
          },
        });
      });
    });

    // Cleanup function
    return () => mm.revert();
  }, [scenes.length]);

  if (!scenes || scenes.length === 0) {
    return null;
  }

  return (
    <div ref={componentRef} className="relative w-full">
      <div className="lg:sticky lg:top-0 lg:h-screen lg:w-full lg:overflow-hidden">
        <div
          ref={trackRef}
          className="relative h-full flex flex-col lg:flex-row w-full lg:w-(--track-width)"
          style={
            {
              "--track-width":
                scenes.length > 1 ? `${scenes.length * 100}vw` : "100vw",
            } as React.CSSProperties
          }
        >
          {scenes.map((scene) => (
            <div key={scene.id} className="scene-panel w-screen h-screen flex items-center justify-center p-8 lg:p-16">
              <div
                className={`
                  w-full max-w-7xl mx-auto flex items-center gap-8 lg:gap-16
                  ${scene.layout === "text-right" ? "flex-col lg:flex-row-reverse" : "flex-col lg:flex-row"}
                `}
              >
                <div className="relative z-10 w-full lg:w-1/2 flex justify-center">
                  <h2 className="scene-text text-5xl md:text-7xl lg:text-9xl font-thin uppercase tracking-tighter text-foreground-muted">
                    {scene.text}
                  </h2>
                </div>
                <div className="relative z-0 w-full lg:w-1/2">
                  <div className="scene-image relative aspect-3/4">
                    <Image src={scene.imageSrc} alt={scene.imageAlt} fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
