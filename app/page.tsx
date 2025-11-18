import { HeroSection } from "@/components/hero-section";
import { MagneticHero } from "@/components/magnetic-hero";
import { HorizontalGallery } from "@/components/horizontal-gallery";
import { ProductGridSection } from "@/components/ProductGridSection";
import { InteractiveCategoryWall } from "@/components/InteractiveCategoryWall";

import { getProducts } from "@/lib/services/productService";
import { galleryScenes } from "@/config/homepage";
import { mainCategories } from "@/config/categories";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <MagneticHero />
      <ProductGridSection products={products} />
      <HorizontalGallery scenes={galleryScenes} />
      <HeroSection />
      <InteractiveCategoryWall categories={mainCategories} />
    </>
  );
}
