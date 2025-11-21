"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const LOOKS = [
  { id: 1, src: "/images/collection-look-1.png", alt: "Look 1 - Denim Trench" },
  { id: 2, src: "/images/collection-look-2.png", alt: "Look 2 - Oversized Hoodie" },
  { id: 3, src: "/images/collection-look-3.png", alt: "Look 3 - Deconstructed Blazer" },
  { id: 4, src: "/images/collection-look-4.png", alt: "Look 4 - Metallic Puffer" },
];

export function CollectionSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative w-full bg-neutral-50 text-black min-h-screen border-t border-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Left Column: Sticky Content */}
        <div className="relative h-[50vh] lg:h-screen lg:sticky lg:top-0 flex flex-col justify-between p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-black">
          <div>
            <h2 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-6">
              Winter <br /> 25
            </h2>
            <p className="text-lg font-mono uppercase tracking-widest text-gray-500">
              The Collection
            </p>
          </div>
          
          <div className="space-y-8">
             <p className="max-w-md text-sm lg:text-base leading-relaxed">
                A return to the essential. Stripped back layers revealing the core of the design philosophy. 
                Sharp tailoring meets unexpected volume.
             </p>
             <div className="flex flex-col gap-2">
                {["Lookbook", "Campaign", "Backstage"].map((item, i) => (
                   <a key={i} href="#" className="group flex items-center justify-between border-b border-black/20 py-2 hover:border-black transition-colors">
                      <span className="uppercase text-sm tracking-widest group-hover:pl-2 transition-all">{item}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                   </a>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Scrolling Feed */}
        <div className="flex flex-col">
           {LOOKS.map((look) => (
              <div key={look.id} className="relative w-full aspect-3/4 lg:aspect-square border-b border-black last:border-b-0 group overflow-hidden">
                 <Image 
                   src={look.src} 
                   alt={look.alt} 
                   fill 
                   className="object-cover transition-transform duration-500 group-hover:scale-105"
                 />
                 
                 {/* Hover Overlay */}
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                 <div className="absolute bottom-4 right-4 bg-white px-3 py-1 text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 z-10">
                    Shop Look {look.id}
                 </div>
              </div>
           ))}
           
           {/* Final CTA Block */}
           <div className="relative w-full aspect-video lg:aspect-auto lg:h-[50vh] flex items-center justify-center bg-black text-white p-10 text-center">
              <div>
                 <h3 className="text-4xl font-bold uppercase mb-4">Discover Full Collection</h3>
                 <Link href="/category/ready-to-wear" className="px-8 py-3 bg-white text-black uppercase text-xs tracking-widest hover:bg-gray-200 transition-colors">
                    View All
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
