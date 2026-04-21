import AboutSectionOne from "@/components/About/AboutSectionOne";
import Breadcrumb from "@/components/Common/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About BundleBOB | AI Solutions Agency",
  description:
    "BundleBOB is a US-registered LLC of engineers, designers, and AI specialists. Learn how we build apps, AI systems, and automation for businesses ready to grow.",
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About BundleBOB"
        description="A modern US-registered LLC of engineers, designers, and AI specialists obsessed with building things that actually work."
      />
      <AboutSectionOne />
    </>
  );
};

export default AboutPage;
