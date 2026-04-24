import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact BundleBOB | Free AI Consultation",
  description:
    "Book a free 30-minute consultation with BundleBOB. No commitment — just a real conversation about your goals and how AI can help your business grow.",
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Us"
        description="Book a free 30-minute AI consultation. No commitment, no pitch deck — just a real conversation about your goals."
      />
      <Contact />
    </>
  );
};

export default ContactPage;
