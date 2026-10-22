import { Hero } from "@/components/home/hero";
import { Collections } from "@/components/home/collections";
import { FeaturedProducts } from "@/components/home/featured-products";
import { BrandStory } from "@/components/home/brand-story";
import { SignatureFeature } from "@/components/home/signature-feature";
import { InstagramFeed } from "@/components/home/instagram";

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <FeaturedProducts />
      <BrandStory />
      <SignatureFeature />
      <InstagramFeed />
    </>
  );
}
