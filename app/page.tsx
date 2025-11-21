import { HeroSection } from "@/components/hero-section";
import { MagneticHero } from "@/components/magnetic-hero";
import { HorizontalGallery } from "@/components/horizontal-gallery";
import { ProductGridSection } from "@/components/ProductGridSection";
import { InteractiveCategoryWall } from "@/components/InteractiveCategoryWall";
import { StatementMarquee } from "@/components/StatementMarquee";
import { EditorialCampaign } from "@/components/EditorialCampaign";
import { CollectionSpotlight } from "@/components/CollectionSpotlight";

import { getProducts } from "@/lib/services/productService";
import { galleryScenes } from "@/config/homepage";
import { mainCategories } from "@/config/categories";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <MagneticHero />
      <StatementMarquee />
      <ProductGridSection products={products} />
      <InteractiveCategoryWall categories={mainCategories} />
      <EditorialCampaign />
      <HorizontalGallery scenes={galleryScenes} />
      <HeroSection />
      <CollectionSpotlight />
    </>
  );
}
