import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import RevealProvider from "@/components/Common/RevealProvider";
import "@/styles/index.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://bundlebob.com"),
  title: {
    default: "BundleBoB — an embedded margin engineer for mid-market construction",
    template: "%s | BundleBoB",
  },
  description:
    "We embed one engineer inside a mid-market general contractor to connect Procore, Sage, Foundation, QuickBooks and the spreadsheets nobody owns — then build the layer on top that shows where the margin is leaking. A headcount line, not a software subscription.",
  keywords: [
    "construction job costing",
    "general contractor analytics",
    "Procore Sage integration",
    "WIP schedule",
    "margin fade",
    "embedded engineer",
  ],
  openGraph: {
    title: "BundleBoB — an embedded margin engineer for mid-market construction",
    description:
      "One engineer, embedded in your firm. Connect your systems, get job costing and cash on current data, then plain-English answers a person approves.",
    type: "website",
    url: "https://bundlebob.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "BundleBoB — embedded margin engineer for construction",
    description: "Connect your systems. See where the margin leaks. A person approves every action.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[999] focus:bg-accent focus:px-3 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:text-black"
        >
          Skip to content
        </a>
        <RevealProvider />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
