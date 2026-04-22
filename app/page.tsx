import Hero from "@/components/Hero";
import MarqueeBrands from "@/components/Brands";
import Services from "@/components/Features";
import Video from "@/components/Video";
import AboutSectionOne from "@/components/About/AboutSectionOne";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeBrands />
      <Services />
      <Video />
      <AboutSectionOne />
      <Testimonials />
      <Pricing />
      <Contact />
    </main>
  );
}
