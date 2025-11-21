import Image from "next/image";

export function EditorialCampaign() {
  return (
    <section className="w-full py-24 px-4 md:px-8 bg-white text-black overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 auto-rows-min">
          {/* Large Hero Image - Spans 8 cols */}
          <div className="md:col-span-8 relative aspect-4/3 md:aspect-16/10 group overflow-hidden">
             <Image 
               src="/images/editorial-hero.png" 
               alt="Campaign Visual 01" 
               fill 
               className="object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute bottom-0 left-0 p-6 md:p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white mix-blend-difference">The New Silhouette</h3>
             </div>
          </div>

          {/* Text Block - Spans 4 cols */}
          <div className="md:col-span-4 flex flex-col justify-end p-6 md:p-10 border-l border-black/10">
            <span className="text-xs font-mono uppercase tracking-widest mb-4 text-gray-500">Editorial — Fall 2025</span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase leading-[0.9] mb-8">
              Breaking <br /> The <br /> Mold
            </h2>
            <p className="text-sm md:text-base leading-relaxed max-w-md text-gray-600">
              A deconstruction of traditional forms. We explore the boundaries between structure and fluidity, creating a new language of dress that defies expectation.
            </p>
            <button className="mt-8 px-8 py-3 border border-black text-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-colors w-max">
              View Story
            </button>
          </div>

          {/* Secondary Image - Spans 5 cols, offset */}
          <div className="md:col-span-5 md:col-start-2 relative aspect-3/4 mt-12 md:-mt-24 z-10 group">
             <Image 
               src="/images/editorial-secondary.png" 
               alt="Campaign Visual 02" 
               fill 
               className="object-cover transition-transform duration-700 group-hover:scale-105"
             />
          </div>

          {/* Detail Shot - Spans 4 cols */}
          <div className="md:col-span-4 md:col-start-8 relative aspect-square mt-8 md:mt-12 group">
             <Image 
               src="/images/editorial-detail.png" 
               alt="Detail 03" 
               fill 
               className="object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <p className="absolute -bottom-8 left-0 text-[10px] uppercase tracking-widest text-gray-400">
                Ref. 883-921 // Leather Detail
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}
