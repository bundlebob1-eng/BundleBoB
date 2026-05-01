import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a free 30-minute AI consultation with BundleBOB. No commitment — just a real conversation about your goals.",
};

export default function ContactPage() {
  return <ContactForm />;
}
