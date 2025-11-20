import { useLayoutEffect, useRef, DependencyList } from "react";
import { gsap } from "gsap";

// This hook applies a staggered fade-in animation to the children of a container.
// It returns a ref that you attach to the container element.
export function useStaggeredGrid(dependencies: DependencyList = []) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const items = container.querySelectorAll(".product-card");

      if (items.length === 0) return;

      // fade in and slide up, with a slight stagger.
      gsap.fromTo(
        items,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          overwrite: "auto",
        }
      );
    }, container);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return containerRef;
}
