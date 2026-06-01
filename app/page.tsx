// ── Sections ──────────────────────────────────────────
import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";
import Categories from "@/components/sections/categories";
import Products from "@/components/sections/products";
import PromoBanner from "@/components/sections/promo-banner";
import Brands from "@/components/sections/brands";
import Features from "@/components/sections/features";
import Testimonials from "@/components/sections/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Categories />
      <Products />
      <PromoBanner />
      <Brands />
      <Features />
      <Testimonials />
    </>
  );
}
