import Hero3D from "@/components/Hero3D";
import Brands from "@/components/Brands";
import ServicesPreview from "@/components/ServicesPreview";
import Process from "@/components/Process";
import About from "@/components/AboutPreview";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero3D />
      <Brands />
      <ServicesPreview />
      <Process />
      <About />
      <Testimonials />
      <Pricing />
      <CTA />
    </>
  );
}
