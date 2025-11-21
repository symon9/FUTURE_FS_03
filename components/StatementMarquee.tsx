"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function StatementMarquee() {
  const firstText = useRef<HTMLDivElement>(null);
  const secondText = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const xPercent = useRef(0);

  useEffect(() => {
    const direction = -1;
    let animationFrameId: number;

    const animate = () => {
      if (xPercent.current <= -100) {
        xPercent.current = 0;
      }
      if (xPercent.current > 0) {
        xPercent.current = -100;
      }
      
      if (firstText.current && secondText.current) {
        gsap.set(firstText.current, { xPercent: xPercent.current });
        gsap.set(secondText.current, { xPercent: xPercent.current });
      }
      
      xPercent.current += 0.05 * direction;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="relative flex h-[40vh] overflow-hidden bg-black text-white items-center">
      <div ref={slider} className="absolute whitespace-nowrap flex">
        <p ref={firstText} className="m-0 text-[15vw] font-black leading-none pr-10 uppercase tracking-tighter">
          Unseen Reality — Defining the Future —
        </p>
        <p ref={secondText} className="absolute left-full top-0 m-0 text-[15vw] font-black leading-none pr-10 uppercase tracking-tighter">
          Unseen Reality — Defining the Future —
        </p>
      </div>
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 to-transparent pointer-events-none" />
    </section>
  );
}
