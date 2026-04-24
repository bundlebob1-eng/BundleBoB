import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Services from "@/components/Features";
import Process from "@/components/Video";
import About from "@/components/About/AboutSectionOne";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <Services />
      <Process />
      <About />
      <Testimonials />
      <Pricing />
      <Contact />
    </main>
  );
}
